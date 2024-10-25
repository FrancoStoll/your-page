"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createPost } from "@/lib/actions/posts/posts.actions";
import { ActionState } from "@/lib/auth/middleware";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";

export const metadata = {
  title: "Dashboard - Crear publicación",
  description: "Crear una publicación",
};

export default function CreatePost({
  searchParams: { success },
}: {
  searchParams: { success: string };
}) {
  const router = useRouter();

  const isSuccess = success === "true";

  const [state, formData, pending] = useActionState<ActionState, FormData>(
    createPost,
    { error: "", success: "" }
  );

  return (
    <>
      {isSuccess ? (
        <div className="flex justify-center p-10 h-full">
          <section className="flex flex-col items-center">
            <Image
              src="/assets/gifs/success.gif"
              height={300}
              width={280}
              alt="success"
              className=""
            />
            <h2 className="header mb-6 max-w-[600px] text-center">
              Tu <span className="text-blue-500">publicacion</span> Tu fue
              creada correctamente
            </h2>
            <Button
              type="button"
              onClick={() => router.replace("/dashboard/createpost")}
            >
              Crea otra publicacion
            </Button>
          </section>
        </div>
      ) : (
        <div className="padding-dynamic space-y-4">
          <div className="">
            <p className="text-blue-500 font-bold tracking-tight text-xl">
              Crea una publicacion y comparte tu pagina con tus amigos o
              clientes
            </p>
          </div>

          <form
            action={formData}
            className="flex flex-col justify-center shadow-md padding-dynamic rounded-md space-y-4"
          >
            <div className="flex flex-col space-y-2">
              <Label htmlFor="title" className="text-[16px] font-semibold">
                Titulo de la publicacion
                <span className="text-sm font-normal">*</span>
              </Label>
              <Input
                id="title"
                name="title"
                type="text"
                placeholder="Escribe el titulo de tu publicacion"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <Label
                htmlFor="description"
                className="text-[16px] font-semibold"
              >
                Una breve descripción
                <span className="text-sm font-normal">*</span>
              </Label>
              <Textarea
                placeholder="Escribe aquí una breve descripción de tu publicacion"
                id="description"
                name="description"
                rows={5}
              />
            </div>

            <div className="flex flex-col space-y-2">
              <Label className="text-[16px] font-semibold" htmlFor="image">Añade una imagen para mostrar. JPG/PNG</Label>
              <Input type="file" name="image" id="image" accept="image/*" />
            </div>

            <div className="flex flex-col">
              <Label htmlFor="price" className="text-[16px] font-semibold">
                Precio del producto (opcional)
              </Label>
              <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between">
                <Input
                  placeholder="1119 ARS"
                  id="price"
                  name="price"
                  className="w-fit"
                  type="number"
                />
                <Button
                  variant="default"
                  type="submit"
                  className="w-fit self-end bg-blue-500 hover:bg-blue-600 transition-colors"
                >
                  Crear publicacion
                </Button>
              </div>
            </div>
            <p
              className={`text-sm ${
                state.success ? "text-green-500" : "text-red-500"
              }  text-center`}
            >
              {state.success && state.success}
              {state?.error && state.error}
            </p>
          </form>
        </div>
      )}
    </>
  );
}
