"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function CreatePost({
  searchParams: { success },
}: {
  searchParams: { success: string };
}) {
  const router = useRouter();

  const isSuccess = success === "true";

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
              Tu <span className="text-orange-500">publicacion</span> Tu fue
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
            <p className="text-orange-500 font-bold tracking-tight text-xl">
              Crea una publicacion y comparte tu pagina con tus amigos o
              clientes
            </p>
          </div>

          <form
            action=""
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
                />
                <Button
                  // TODO: PASARLO A SUBMIT Y TERMINAR EL FORMULARIO
                  variant="default"
                  type="button"
                  className="w-fit self-end bg-orange-500 hover:bg-orange-600 transition-colors"
                  onClick={() =>
                    router.replace("/dashboard/createpost?success=true")
                  }
                >
                  Crear publicacion
                </Button>
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
