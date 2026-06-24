import { string, z } from "zod";

import styles from "./RegistrationForm.module.scss";
import { useId, useState } from "react";

import Input from "../Input/Input";
import Button from "../Button/Button";

const schima = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  pass1: z.string().min(8, "Password must be at least 8 characters"),
  pass2: z.string().min(8, "Password must be at least 8 characters"),
  email: z.string().email({ message: "Invalid email address" }),
});

interface OnSubmitProps {
  onSubmit: (value: object) => void;
}

export default function RegistrationForm({ onSubmit }: OnSubmitProps) {
  const fieldId = useId();

  const [erorrs, setErorrs] = useState<Record<string, string>>({});

  const handleSubmit = (formData: FormData) => {
    const data = Object.fromEntries(formData);

    const result = schima.safeParse(data);
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

    console.log("регістрація вдалась");

    setErorrs({});
    onSubmit(result);
  };

  return (
    <form className={styles.form} action={handleSubmit}>
      <h2 className={styles.title}>Registration</h2>

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
        <label htmlFor={`${fieldId}-pass1`}>Password</label>
        <Input
          type="password"
          name="pass1"
          id={`${fieldId}-pass1`}
          autoComplete="new-password"
          placeholder="Password"
        />
        <span className={styles.erorrs}>{erorrs.pass1}</span>
      </div>

      <div className={styles.field}>
        <label htmlFor={`${fieldId}-pass2`}>Confirm password</label>
        <Input
          type="password"
          name="pass2"
          id={`${fieldId}-pass2`}
          autoComplete="new-password"
          placeholder="Repeat password"
        />
        <span className={styles.erorrs}>{erorrs.pass2}</span>
      </div>

      <div className={styles.field}>
        <label htmlFor={`${fieldId}-email`}>Email</label>
        <Input
          type="email"
          name="email"
          id={`${fieldId}-email`}
          autoComplete="email"
          placeholder="example@gmail.com"
        />
        <span className={styles.erorrs}>{erorrs.email}</span>
      </div>

      <Button size="lg" type="submit">
        Registration
      </Button>
    </form>
  );
}
