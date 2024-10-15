'use server'


import { revalidatePath } from "next/cache";
import { ActionState } from "../auth/middleware"
import { getUser, verifyDomainName, insertDomainIntoDB, verifyUserHaveDomain } from "../db/queries";
import { domains } from '../db/schema';




export async function createDomain(state: ActionState, formData: FormData) {
    const domainInput = formData.get("domain") as string;
    const user = await getUser()
    if (!user) return {
        error: "No user"
    }
    const haveDomain = await verifyUserHaveDomain(user.id)


    if (haveDomain) return { error: "Solo puedes tener un solo dominio con el plan gratuito" };
    if (domainInput === "dashboard") return { success: "", error: "No se puede crear el dominio dashboard" };

    // Reemplazar espacios y barras diagonales con guiones
    const formattedDomain = domainInput.trim().replace(/\s+/g, '-').replace(/\//g, '-');
    try {
        // Verificar si el domain esta en uso
        const existDomain = await verifyDomainName(formattedDomain);

        if (existDomain) return { error: "El dominio ya existe" };

        const newDomain = await insertDomainIntoDB({
            domainName: formattedDomain,
            userId: user.id
        })

        if (newDomain) return { success: "Dominio creado correctamente" }

        revalidatePath('/dashboard')
    } catch (error) {
        console.log(error)
        return {
            error: "Error interno, porfavor intenta nuevamente"
        }
    }



}