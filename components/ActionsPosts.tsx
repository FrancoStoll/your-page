"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Trash2Icon } from "lucide-react";

export const ActionsPosts = ({ postId }: { postId: number }) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Trash2Icon className="text-red-700 absolute top-2 right-0 cursor-pointer h-4" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Estas seguro de borrar esta publicacion?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Esta accion eliminara permanentemente tu publicacion.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction className="bg-red-600 text-white hover:bg-red-700" onClick={() => console.log("borrando", postId)}>
            Borrar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
