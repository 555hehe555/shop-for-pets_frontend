import Main from "@/components/layout/Main/Main";
import { LoginForm } from "@/features/auth/components/LoginForm/LoginForm";

export default function LoginPage() {
  function onLoginSuccessful() {
    history.back();
  }
  return (
    <Main>
      <LoginForm onLoginSuccessful={onLoginSuccessful} />
    </Main>
  );
}
