import Main from "@/components/layout/Main/Main";
import { RegistrationForm } from "@/features/auth";

export default function RegistrationPage() {
  function onRegistrationSuccessful() {
    history.back();
  }

  return (
    <Main>
      <RegistrationForm onRegistrationSuccessful={onRegistrationSuccessful} />
    </Main>
  );
}
