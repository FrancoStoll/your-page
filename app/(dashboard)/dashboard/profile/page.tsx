
import { ProfileForm } from "./ProfileForm";
import { getProfile } from "@/lib/actions/profile/profile.action";

export default async function ProfilePage() {


    const profile = await getProfile();
  

    
  return <ProfileForm {...profile} />;
}
