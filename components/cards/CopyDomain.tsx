"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { Copy, Check, Globe2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function CopyDomain() {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();
  const dominio = "nuestrodominio/nuevo";
  const dominioCompleto = `https://${dominio}`;

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(dominioCompleto)
      .then(() => {
        setCopied(true);
        toast({
          title: "Dominio copiado",
          description:
            "El enlace de tu dominio ha sido copiado al portapapeles.",
        });
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(() => {
        toast({
          title: "Error",
          description:
            "No se pudo copiar el dominio. Por favor, inténtalo de nuevo.",
          variant: "destructive",
        });
      });
  };

  return (
    <Card className="w-full max-w-md  mt-10">
      <CardHeader className="pb-3">
        <CardTitle className="text-2xl font-bold text-orange-500 flex items-center gap-2">
          <Globe2 className="h-6 w-6" />
          Tu dominio
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center justify-between bg-gray-100 p-3 rounded-md mb-3">
          <span className="text-gray-800 font-medium">{dominioCompleto}</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={copyToClipboard}
            className="text-gray-500 hover:text-gray-700"
          >
            {copied ? (
              <Check className="h-4 w-4" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
            <span className="sr-only">Copiar dominio</span>
          </Button>
        </div>
        <p className="text-sm text-gray-600">
          Este es tu dominio personal para mostrar tu portafolio y proyectos.
        </p>
      </CardContent>
    </Card>
  );
}
