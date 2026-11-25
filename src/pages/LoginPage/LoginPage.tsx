import Main from "@/components/layout/Main/Main";
import { LoginForm } from "@/features/auth/components/LoginForm/LoginForm";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export default function LoginPage() {
  useDocumentTitle("Вхід");

  function onLoginSuccessful() {
    history.back();
  }
  return (
    <Main>
      <LoginForm onLoginSuccessful={onLoginSuccessful} />
    </Main>
  );
}
