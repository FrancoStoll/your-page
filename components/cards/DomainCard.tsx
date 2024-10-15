import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Globe, CheckCircle, PanelsTopLeft } from "lucide-react";
import { DomainSchema } from "@/lib/db/schema";

export default function DomainCard({id,name,userId}:DomainSchema) {
  return (
    <div className="w-full mx-auto p-4">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center text-base">
            <PanelsTopLeft className="mr-2 h-5 w-5 text-orange-500" />
            nuestrodominio/<span className="text-orange-500 font-black">{name}</span>
          </CardTitle>
          <CardDescription>Creado el 15 de octubre, 2024</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
              <span className="text-sm text-muted-foreground">Activo</span>
            </div>
            <Badge variant="secondary" className="bg-pink-100 text-pink-800">
              Personal
            </Badge>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Tu página personal para mostrar tu portafolio y proyectos.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
