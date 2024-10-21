'use server';

import { validatedAction, validatedActionWithUser } from "@/lib/auth/middleware";
import { db } from "@/lib/db/drizzle";
import { getUser } from "@/lib/db/queries";
import { domains, images, NewProfile, posts, profiles, ProfileSchema, users } from "@/lib/db/schema";
import { asc, desc, eq } from "drizzle-orm";
import { z } from "zod";





const profileSchema = z.object({
    fullName: z.string().max(100),
    instagramUrl: z.string().max(100),
    facebookUrl: z.string().max(100),
    description: z.string().max(100),
})

export const submitProfile = validatedActionWithUser(profileSchema, async (data, formData, user) => {


    const newSchema: NewProfile = {
        fullName: data.fullName,
        instagramUrl: data.instagramUrl,
        facebookUrl: data.facebookUrl,
        description: data.description,
        userId: user.id
    }

    // TODO: PASAR TODO A UN ARCHIVO DE QUERIES
    const existingProfile = await db.select().from(profiles).where(eq(profiles.userId, user.id))
    if (existingProfile.length > 0) {
        await db.update(profiles).set(newSchema).where(eq(profiles.id, existingProfile[0].id))
    } else {
        await db.insert(profiles).values(newSchema)
    }

    return { success: "Perfil actualizado correctamente" };



})


export const getProfile = async () => {


    const user = await getUser();
    if (!user) return null
    const profile = await db.select().from(profiles).where(eq(profiles.userId, user.id)).limit(1)
    if (!profile) return null
    return profile[0]


}


export const getDomainByName = async (name: string) => {

    // Search domain and user
    const domain = await db.select().from(domains).where(eq(domains.name, name)).leftJoin(users, eq(domains.userId, users.id)).leftJoin(profiles, eq(domains.userId, profiles.userId)).limit(1)


    const userId = domain[0].users?.id;

    if (!userId) return null;

    const postsDb = await db.select().from(posts).where(eq(posts.userId, userId)).orderBy(desc(posts.createdAt))

    const postsWithImages = await Promise.all(postsDb.map(async (post) => {
        const image = await db.select().from(images).where(eq(images.postId, post.id)).limit(1)
        return {
            ...post,
            image: image[0]?.name ?? null
        }

    }))


    if (!domain) return null

   

    return {
        ...domain[0],
        posts: postsWithImages
    }



}