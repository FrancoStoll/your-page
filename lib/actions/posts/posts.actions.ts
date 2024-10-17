'use server'

import { validatedActionWithUser } from "@/lib/auth/middleware"
import { db } from "@/lib/db/drizzle"
import { NewPost, posts, } from "@/lib/db/schema"
import { eq, min } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import { title } from "process"
import { z } from "zod"
import { getUser } from '@/lib/db/queries';











const newPostSchema = z.object({
    title: z.string().min(4).max(100),
    description: z.string().min(4).max(100),
    price: z.string().default("0"),
})

export const createPost = validatedActionWithUser(newPostSchema, async (data, formData, user) => {


    // Recorar que el formData siempre maneja string asi que los numeros hay que parsearlo

    const newPost: NewPost = {
        title: data.title,
        description: data.description,
        price: parseInt(data.price),
        userId: user.id
    }

    // TODO: PASAR TODO A UN ARCHIVO DE QUERIES

    await db.insert(posts).values(newPost)

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