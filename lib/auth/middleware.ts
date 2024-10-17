import { z } from 'zod'; // Importa la biblioteca Zod para la validación de esquemas
import { User } from '@/lib/db/schema'; // Importa el modelo User desde el esquema de la base de datos
import { getUser } from '@/lib/db/queries'; // Importa funciones para obtener datos del usuario


// Define el tipo de estado de acción
export type ActionState = {
  error?: string; // Mensaje de error opcional
  success?: string; // Mensaje de éxito opcional
  [key: string]: any; // Permite propiedades adicionales
};

// Tipo para funciones de acción validadas
type ValidatedActionFunction<S extends z.ZodType<any, any>, T> = (
  data: z.infer<S>, // Datos validados
  formData: FormData // Datos del formulario
) => Promise<T>; // Retorna una promesa

// Función que valida los datos y ejecuta una acción
export function validatedAction<S extends z.ZodType<any, any>, T>(
  schema: S, // Esquema de validación
  action: ValidatedActionFunction<S, T> // Función de acción
) {
  return async (prevState: ActionState, formData: FormData): Promise<T> => {
    // Valida los datos del formulario
    const result = schema.safeParse(Object.fromEntries(formData));
    if (!result.success) {
      // Retorna un mensaje de error si la validación falla
      return { error: result.error.errors[0].message } as T;
    }

    // Ejecuta la acción si la validación es exitosa
    return action(result.data, formData);
  };
}

// Tipo para funciones de acción validadas que requieren usuario
type ValidatedActionWithUserFunction<S extends z.ZodType<any, any>, T> = (
  data: z.infer<S>, // Datos validados
  formData: FormData, // Datos del formulario
  user: User // Usuario autenticado
) => Promise<T>; // Retorna una promesa

// Función que valida los datos, verifica el usuario y ejecuta una acción
export function validatedActionWithUser<S extends z.ZodType<any, any>, T>(
  schema: S, // Esquema de validación
  action: ValidatedActionWithUserFunction<S, T> // Función de acción
) {
  return async (prevState: ActionState, formData: FormData): Promise<T> => {
    // Obtiene el usuario autenticado
    const user = await getUser();
    if (!user) {
      throw new Error('User is not authenticated'); // Lanza un error si no hay usuario autenticado
    }




    
    const formDataObject = Object.fromEntries(formData);

  

    // Valida los datos del formulario
    const result = schema.safeParse(formDataObject);
 
    if (!result.success) {
      // Retorna un mensaje de error si la validación falla
      return { error: result.error.errors[0].message } as T;
    }

    // Ejecuta la acción si la validación es exitosa
    return action(result.data, formData, user);
  };
}
