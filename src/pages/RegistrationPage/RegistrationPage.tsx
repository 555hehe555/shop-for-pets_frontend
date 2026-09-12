import { RegistrationForm } from "@/features/auth";

export default function RegistrationPage() {
  function onRegistrationSuccessful() {
    history.back();
  }

  return (
    <RegistrationForm onRegistrationSuccessful={onRegistrationSuccessful} />
  );
}
