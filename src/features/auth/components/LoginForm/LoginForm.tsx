import styles from "./LoginForm.module.scss";
import { useId, useState } from "react";

import Input from "@/ui/Input/Input";
import Button from "@/ui/Button/Button";
import { loginSchema } from "@/schemas";

interface OnSubmitProps {
  onSubmit: (value: object) => void;
}

export function LoginForm({ onSubmit }: OnSubmitProps) {
  const fieldId = useId();

  const [erorrs, setErorrs] = useState<Record<string, string>>({});

  const handleSubmit = (formData: FormData) => {
    const data = Object.fromEntries(formData);

    const result = loginSchema.safeParse(data);
    console.log(result);

    if (!result.success) {
      const errorsForm: Record<string, string> = {};
      result.error.issues.forEach((issu) => {
        const path = issu.path[0] as string;
        if (!errorsForm[path]) {
          errorsForm[path] = issu.message;
        }
      });
      setErorrs(errorsForm);
      return;
    }

    console.log("вхід вдався");

    setErorrs({});
    onSubmit(result.data);
  };

  return (
    <form className={styles.form} action={handleSubmit}>
      <h2 className={styles.title}>Login</h2>

      <div className={styles.field}>
        <label htmlFor={`${fieldId}-username`}>Username</label>
        <Input
          type="text"
          name="username"
          id={`${fieldId}-username`}
          autoComplete="username"
          placeholder="Username"
        />
        <span className={styles.erorrs}>{erorrs.username}</span>
      </div>

      <div className={styles.field}>
        <label htmlFor={`${fieldId}-pass`}>Password</label>
        <Input
          type="password"
          name="pass"
          id={`${fieldId}-pass`}
          autoComplete="password"
          placeholder="Password"
        />
        <span className={styles.erorrs}>{erorrs.pass}</span>
      </div>

      <Button size="lg" type="submit">
        Login
      </Button>
    </form>
  );
}
