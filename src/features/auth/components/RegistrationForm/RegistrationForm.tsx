import { useId, useState } from "react";
import { Box, Typography } from "@mui/material";
import toast from "react-hot-toast";

import Input from "@/ui/Input/Input";
import Button from "@/ui/Button/Button";
import { registrationSchema } from "@/schemas";
import { useAuth } from "../../context/AuthContext";
import { getAuthErrorMessage } from "../../utils/authError";
import { styles } from "./RegistrationForm.styles";

interface RegistrationFormProps {
  onRegistrationSuccessful: () => void;
}

export function RegistrationForm({
  onRegistrationSuccessful,
}: RegistrationFormProps) {
  const fieldId = useId();
  const { registerUser } = useAuth();

  const [erorrs, setErorrs] = useState<Record<string, string>>({});
  const [values, setValues] = useState({
    username: "",
    pass1: "",
    pass2: "",
    email: "",
  });
  const [isPending, setIsPending] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = registrationSchema.safeParse(values);

    if (!result.success) {
      const errorsForm: Record<string, string> = {};
      result.error.issues.forEach((issu) => {
        const path = issu.path[0];
        if (typeof path === "string" && !errorsForm[path]) {
          errorsForm[path] = issu.message;
        }
      });
      setErorrs(errorsForm);
      return;
    }

    setErorrs({});
    setIsPending(true);
    try {
      await registerUser({
        username: result.data.username,
        password: result.data.pass1,
        email: result.data.email,
      });
      toast.success("Реєстрація успішна!", { id: "registration-success" });
      onRegistrationSuccessful();
    } catch (error) {
      toast.error(getAuthErrorMessage(error, "registration"), {
        id: "registration-error",
      });
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Box sx={styles.formContainer}>
      <Box component="form" sx={styles.form} onSubmit={handleSubmit}>
        <Typography variant="h4" component="h1" sx={styles.title}>
          Registration
        </Typography>

        <Box sx={styles.field}>
          <Typography
            component="label"
            htmlFor={`${fieldId}-username`}
            sx={styles.label}
          >
            Username
          </Typography>
          <Input
            type="text"
            name="username"
            id={`${fieldId}-username`}
            autoComplete="username"
            placeholder="Username"
            value={values.username}
            onChange={handleChange}
          />
          <Typography component="span" sx={styles.errorText}>
            {erorrs.username}
          </Typography>
        </Box>

        <Box sx={styles.field}>
          <Typography
            component="label"
            htmlFor={`${fieldId}-pass1`}
            sx={styles.label}
          >
            Password
          </Typography>
          <Input
            type="password"
            name="pass1"
            id={`${fieldId}-pass1`}
            autoComplete="new-password"
            placeholder="Password"
            value={values.pass1}
            onChange={handleChange}
          />
          <Typography component="span" sx={styles.errorText}>
            {erorrs.pass1}
          </Typography>
        </Box>

        <Box sx={styles.field}>
          <Typography
            component="label"
            htmlFor={`${fieldId}-pass2`}
            sx={styles.label}
          >
            Confirm password
          </Typography>
          <Input
            type="password"
            name="pass2"
            id={`${fieldId}-pass2`}
            autoComplete="new-password"
            placeholder="Repeat password"
            value={values.pass2}
            onChange={handleChange}
          />
          <Typography component="span" sx={styles.errorText}>
            {erorrs.pass2}
          </Typography>
        </Box>

        <Box sx={styles.field}>
          <Typography
            component="label"
            htmlFor={`${fieldId}-email`}
            sx={styles.label}
          >
            Email
          </Typography>
          <Input
            type="email"
            name="email"
            id={`${fieldId}-email`}
            autoComplete="email"
            placeholder="example@gmail.com"
            value={values.email}
            onChange={handleChange}
          />
          <Typography component="span" sx={styles.errorText}>
            {erorrs.email}
          </Typography>
        </Box>

        <Button size="lg" type="submit" sx={styles.submitButton} disabled={isPending}>
          Registration
        </Button>
      </Box>
    </Box>
  );
}
