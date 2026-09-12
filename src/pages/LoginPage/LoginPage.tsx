import { LoginForm } from "@/features/auth/components/LoginForm/LoginForm";

export default function LoginPage() {
  function onLoginSuccessful() {
    history.back();
  }
  return <LoginForm onLoginSuccessful={onLoginSuccessful} />;
}
