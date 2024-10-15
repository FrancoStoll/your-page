'use server';

import { z } from 'zod';
import { eq } from 'drizzle-orm';
import { db } from '@/lib/db/drizzle';
import { users, type NewUser } from '@/lib/db/schema';
import { comparePasswords, hashPassword, setSession } from '@/lib/auth/session';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { validatedAction, validatedActionWithUser } from '@/lib/auth/middleware';

/**
 * Esquema de validación para iniciar sesión
 */
const signInSchema = z.object({
  email: z.string().email().min(3).max(255),
  password: z.string().min(8).max(100),
});

/**
 * Acción para iniciar sesión
 */
export const signIn = validatedAction(signInSchema, async (data, formData) => {
  const { email, password } = data;

  // Buscar al usuario por correo electrónico
  const [foundUser] = await db.select().from(users).where(eq(users.email, email)).limit(1);

  if (!foundUser) {
    return { error: 'Correo electrónico o contraseña inválidos. Por favor, inténtalo de nuevo.' };
  }

  // Comparar la contraseña
  const isPasswordValid = await comparePasswords(password, foundUser.passwordHash);

  if (!isPasswordValid) {
    return { error: 'Correo electrónico o contraseña inválidos. Por favor, inténtalo de nuevo.' };
  }

  // Establecer la sesión
  await setSession(foundUser);

  // Redirigir al usuario
  const redirectTo = formData.get('redirect') as string | null;
  redirect(redirectTo || '/dashboard');
});

/**
 * Esquema de validación para registrarse
 */
const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

/**
 * Acción para registrarse
 */
export const signUp = validatedAction(signUpSchema, async (data, formData) => {
  const { email, password } = data;

  // Verificar si el correo ya está registrado
  const existingUser = await db.select().from(users).where(eq(users.email, email)).limit(1);

  if (existingUser.length > 0) {
    return { error: 'El correo electrónico ya está registrado. Por favor, inicia sesión o utiliza otro correo.' };
  }

  // Hashear la contraseña
  const passwordHash = await hashPassword(password);

  const newUser: NewUser = {
    email,
    passwordHash,
    role: 'member', // Valor por defecto, puedes omitirlo si ya tiene un default
  };

  // Insertar el nuevo usuario
  const [createdUser] = await db.insert(users).values(newUser).returning();

  if (!createdUser) {
    return { error: 'No se pudo crear el usuario. Por favor, inténtalo de nuevo.' };
  }

  // Establecer la sesión
  await setSession(createdUser);

  // Redirigir al usuario
  redirect('/dashboard');
});

/**
 * Acción para cerrar sesión
 */
export async function signOut() {
  // Eliminar la cookie de sesión
  cookies().set('session', '', {
    expires: new Date(0),
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
  });

  // Redirigir al usuario
  redirect('/login');
}

/**
 * Esquema de validación para actualizar la contraseña
 */
const updatePasswordSchema = z
  .object({
    currentPassword: z.string().min(8).max(100),
    newPassword: z.string().min(8).max(100),
    confirmPassword: z.string().min(8).max(100),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ['confirmPassword'],
  });

/**
 * Acción para actualizar la contraseña del usuario
 */
export const updatePassword = validatedActionWithUser(
  updatePasswordSchema,
  async (data, _, user) => {
    const { currentPassword, newPassword } = data;

    // Verificar la contraseña actual
    const isPasswordValid = await comparePasswords(currentPassword, user.passwordHash);

    if (!isPasswordValid) {
      return { error: 'La contraseña actual es incorrecta.' };
    }

    if (currentPassword === newPassword) {
      return {
        error: 'La nueva contraseña debe ser diferente de la contraseña actual.',
      };
    }

    // Hashear la nueva contraseña
    const newPasswordHash = await hashPassword(newPassword);

    // Actualizar la contraseña en la base de datos
    await db
      .update(users)
      .set({ passwordHash: newPasswordHash })
      .where(eq(users.id, user.id));

    return { success: 'Contraseña actualizada exitosamente.' };
  }
);

/**
 * Esquema de validación para eliminar la cuenta
 */
const deleteAccountSchema = z.object({
  password: z.string().min(8).max(100),
});

/**
 * Acción para eliminar la cuenta del usuario
 */
export const deleteAccount = validatedActionWithUser(
  deleteAccountSchema,
  async (data, _, user) => {
    const { password } = data;

    // Verificar la contraseña
    const isPasswordValid = await comparePasswords(password, user.passwordHash);
    if (!isPasswordValid) {
      return { error: 'Contraseña incorrecta. No se pudo eliminar la cuenta.' };
    }

    // Eliminación lógica de la cuenta
    await db
      .update(users)
      .set({
        deletedAt: new Date(),
        email: `${user.email}-${user.id}-deleted`, // Asegurar unicidad del correo
      })
      .where(eq(users.id, user.id));

    // Eliminar la cookie de sesión
    cookies().set('session', '', {
      expires: new Date(0),
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
    });

    // Redirigir al usuario
    redirect('/login');
  }
);

/**
 * Esquema de validación para actualizar la información de la cuenta
 */
const updateAccountSchema = z.object({
  name: z.string().min(1, 'El nombre es obligatorio').max(100),
  email: z.string().email('Dirección de correo inválida'),
});

/**
 * Acción para actualizar la información de la cuenta del usuario
 */
export const updateAccount = validatedActionWithUser(
  updateAccountSchema,
  async (data, _, user) => {
    const { name, email } = data;

    // Actualizar la información en la base de datos
    await db.update(users).set({ name, email }).where(eq(users.id, user.id));

    return { success: 'Cuenta actualizada exitosamente.' };
  }
);
