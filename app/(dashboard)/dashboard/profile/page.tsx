
import { ProfileForm } from "./ProfileForm";
import { getProfile } from "@/lib/actions/profile/profile.action";
export const metadata = {
  title: "Dashboard - Perfil de usuario/empresa",
  description: "Administra tu perfil que veran los potenciales clientes",
};
export default async function ProfilePage() {


    const profile = await getProfile();
  

    
  return <ProfileForm {...profile} />;
}
