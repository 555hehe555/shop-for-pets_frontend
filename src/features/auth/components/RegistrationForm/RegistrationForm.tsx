import { useId, useState } from "react";
import { Box, Typography } from "@mui/material";

import Input from "@/ui/Input/Input";
import Button from "@/ui/Button/Button";
import { registrationSchema } from "@/schemas";
import { useAuth } from "../../context/AuthContext";
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

  const handleSubmit = async (formData: FormData) => {
    const data = Object.fromEntries(formData);

    const result = registrationSchema.safeParse(data);
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

    setErorrs({});
    try {
      await registerUser({
        username: result.data.username,
        password: result.data.pass1,
        email: result.data.email,
      });
      onRegistrationSuccessful();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box component="form" sx={styles.form} action={handleSubmit}>
      <Typography variant="h4" component="h2" sx={styles.title}>
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
        />
        <Typography component="span" sx={styles.errorText}>
          {erorrs.email}
        </Typography>
      </Box>

      <Button
        size="lg"
        type="submit"
        style={{ alignSelf: "center", minWidth: 180 }}
      >
        Registration
      </Button>
    </Box>
  );
}
