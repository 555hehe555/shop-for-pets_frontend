import Main from "@/components/layout/Main/Main";
import { ProfilePet } from "@/features/profile/components/ProfilePet/ProfilePet";
import { ProfileUser } from "@/features/profile/components/ProfileUser/ProfileUser";
import { Divider } from "@mui/material";

export function ProfilePage() {
  return (
    <Main>
      <ProfileUser />
      <Divider />
      <ProfilePet />
    </Main>
  );
}
