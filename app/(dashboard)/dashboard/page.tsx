import { redirect } from "next/navigation";

import { getDomain, getUser } from "@/lib/db/queries";
import { CreateDomainForm } from "@/components/forms/CreateDomainForm";
import DomainCard from "@/components/cards/DomainCard";

export default async function SettingsPage() {
  const user = await getUser();

  if (!user) {
    redirect("/sign-in");
  }

  const domain = await getDomain(user.id);

  return (
    <div className="flex flex-col w-full">
      {/* Title */}
      <h1 className="text-[32px] font-bold tracking-tight text-center py-4 text-orange-500">
        {domain ? "Adminitra tus dominios" : "Crea tu dominio"}
      </h1>

      {domain ? <DomainCard {...domain} /> : <CreateDomainForm />}

      <p className="p-4 tracking-normal text-sm text-muted-foreground">
        Recuerda completar tu perfil para que potenciales clientes puedan
        contactarte
      </p>
    </div>
  );
}
