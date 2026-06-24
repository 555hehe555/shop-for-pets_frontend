import styles from "./RegistrationForm.module.scss";
import { useId } from "react";

import Input from "../Input/Input";
import Button from "../Button/Button";

interface OnSubmitProps {
  onSubmit: (value: object) => void;
}

export default function RegistrationForm({ onSubmit }: OnSubmitProps) {
  const fieldId = useId();

  const handleSubmit = (formData: FormData) => {
    const data = Object.fromEntries(formData);

    onSubmit(data);
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
      </div>

      <Button size="lg" type="submit">
        Registration
      </Button>
    </form>
  );
}
