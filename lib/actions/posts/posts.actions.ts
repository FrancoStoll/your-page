'use server'

import { validatedActionWithUser } from "@/lib/auth/middleware"
import { db } from "@/lib/db/drizzle"
import { images, NewPost, posts, PostSchema, } from "@/lib/db/schema"
import { eq, min } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import { title } from "process"
import { z } from "zod"
import { getUser } from '@/lib/db/queries';
import { v2 as cloudinary } from 'cloudinary';


cloudinary.config(process.env.CLOUDINARY_URL ?? '')







const newPostSchema = z.object({
    title: z.string().min(4).max(100),
    description: z.string().min(4).max(100),
    price: z.string().default("0"),
})

// TODO: PASAR TODO A UN ARCHIVO DE QUERIES
export const createPost = validatedActionWithUser(newPostSchema, async (data, formData, user) => {


    // Recorar que el formData siempre maneja string asi que los numeros hay que parsearlo

    const newPost: NewPost = {
        title: data.title,
        description: data.description,
        price: parseInt(data.price),
        userId: user.id
    }


    const post = await db.insert(posts).values(newPost).returning()






    const image = formData.get('image')
    if (image) {
        const uploadImage = await uploadImageToCloudinary(image as File);
        await db.insert(images).values({
            postId: post[0].id,
            userId: user.id,
            name: uploadImage,
        })
    }



    revalidatePath("/dashboard/createpost")

    return { success: "Publicación creada correctamente" };



})



export const getPosts = async () => {

    const user = await getUser()
    if (!user) return null
    const { id } = user;

    const postsDb = await db.query.posts.findMany({
        where: (posts) => eq(posts.userId, id),
        orderBy: (posts, { asc }) => [asc(posts.createdAt)]

    })


    return postsDb

}


export const postAndImages = async (postsDb: PostSchema[]) => {
    const postsWithImages = await Promise.all(postsDb.map(async (post) => {
        const image = await db.select().from(images).where(eq(images.postId, post.id)).limit(1)
        return {
            ...post,
            image: image[0]?.name ?? null
        }

    }))

    return postsWithImages
}



const uploadImageToCloudinary = async (image: File) => {

    try {

        const buffer = await image.arrayBuffer();

        const base64Image = Buffer.from(buffer).toString('base64');

        return await cloudinary.uploader.upload(`data:image/png;base64,${base64Image}`, { folder: "perfilya" }).then(r => r.secure_url,)



    } catch (error) {
        console.log(error)
        return null

    }

}

