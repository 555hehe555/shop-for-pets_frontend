// import stules from './RegistrationForm.module.scss'
import { useId } from "react";

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
    <form action={handleSubmit}>
      <label htmlFor={`${fieldId}-username`}>username</label>
      <input
        type="text"
        name="username"
        id={`${fieldId}-username`}
        autoComplete="username"
      />

      <label htmlFor={`${fieldId}-pass1`}>pass1</label>
      <input
        type="password"
        name="pass1"
        id={`${fieldId}-pass1`}
        autoComplete="new-password"
      />

      <label htmlFor={`${fieldId}-pass2`}>pass2</label>
      <input
        type="password"
        name="pass2"
        id={`${fieldId}-pass2`}
        autoComplete="new-password"
      />

      <label htmlFor={`${fieldId}-email`}>email</label>
      <input
        type="email"
        name="email"
        id={`${fieldId}-email`}
        autoComplete="email"
      />

      <button type="submit">Registration</button>
    </form>
  );
}
