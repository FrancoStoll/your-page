"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { submitProfile } from "@/lib/actions/profile/profile.action";
import { ActionState } from "@/lib/auth/middleware";
import { ProfileSchema, User } from "@/lib/db/schema";
import router from "next/navigation";
import { useActionState, useEffect, useState } from "react";

export const ProfileForm = ({
  description,
  facebookUrl,
  fullName,
  id,
  instagramUrl,
  userId,
}: Partial<ProfileSchema>) => {
  const [message, setMessage] = useState<ActionState>({
    error: "",
    success: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const menssages = await submitProfile(message, formData);
    setMessage(menssages);
  };

  return (
    <div className="padding-dynamic space-y-4">
      <div className="">
        <p className="text-orange-500 font-bold tracking-tight text-xl">
          Crea una publicacion y comparte tu pagina con tus amigos o clientes
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center shadow-md padding-dynamic rounded-md space-y-4 mt-2"
      >
        <div className="flex flex-col space-y-2">
          <Label htmlFor="fullName" className="text-[16px] font-semibold">
            Nombre completo personal, profesional o de empresa
          </Label>
          <Input
            id="fullName"
            name="fullName"
            type="text"
            placeholder="Ingresa un nombre para mostrar en un página"
            defaultValue={fullName}
          />
        </div>

        <div className="flex flex-col space-y-2">
          <Label htmlFor="instagramUrl" className="text-[16px] font-semibold">
            Tu red social de instagram
          </Label>
          <Input
            id="instagramUrl"
            name="instagramUrl"
            type="instagramUrl"
            placeholder="www.instagram.com/tu-instagram"
            defaultValue={instagramUrl || ""}
          />
        </div>

        {/* facebook */}
        <div className="flex flex-col space-y-2">
          <Label htmlFor="facebookUrl" className="text-[16px] font-semibold">
            Tu red social de facebook
          </Label>
          <Input
            id="facebookUrl"
            name="facebookUrl"
            type="facebookUrl"
            placeholder="www.facebook.com/tu-facebook"
            defaultValue={facebookUrl || ""}
          />
        </div>

        {/* Descripcion del negocio o persona */}

        <div className="flex flex-col space-y-2">
          <Label htmlFor="description" className="text-[16px] font-semibold">
            Una breve descripción
          </Label>
          <Textarea
            placeholder="Escribe aquí una breve descripción de tu publicacion"
            id="description"
            name="description"
            rows={5}
            defaultValue={description || ""}
          />
        </div>

        <div className="flex flex-col">
          <Button
            // TODO: PASARLO A SUBMIT Y TERMINAR EL FORMULARIO
            variant="default"
            type="submit"
            className="w-fit self-end bg-orange-500 hover:bg-orange-600 transition-colors"
          >
            Guardar informacion del perfil
          </Button>
        </div>
        <p
          className={`text-sm ${
            message.success ? "text-green-500" : "text-red-500"
          }  text-center`}
        >
          {message.success && message.success}
          {message?.error && message.error}
        </p>
      </form>
      <p className="h-full mt-10 font-light text-right">
        Proximamente podras subir tu imagen de perfil...
      </p>
    </div>
  );
};
