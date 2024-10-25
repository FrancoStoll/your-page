"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useActionState } from "react";
import { createDomain } from "@/lib/actions/create-domain";
import { ActionState } from "@/lib/auth/middleware";

export const CreateDomainForm = () => {
  const [state, formData, pending] = useActionState<ActionState, FormData>(createDomain, {
    success: "",
    error: "",
  });
  return (
    <form action={formData}>
      <div className="padding-dynamic flex flex-col sm:flex-row items-center justify-center gap-2 w-full">
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            nuestrodominio.com/
          </span>
          <Input
            className="pl-44 bg-background border-muted-foreground/20"
            placeholder="nombre-de-tu-pagina"
            name="domain"
          />
        </div>
        <Button className="bg-blue-500 hover:bg-blue-600 text-white">
          Crea tu propio dominio
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
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
  );
};
