import Main from "@/components/layout/Main/Main";
import { RegistrationForm } from "@/features/auth";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export default function RegistrationPage() {
  useDocumentTitle("Реєстрація");

  function onRegistrationSuccessful() {
    history.back();
  }

  return (
    <Main>
      <RegistrationForm onRegistrationSuccessful={onRegistrationSuccessful} />
    </Main>
  );
}
