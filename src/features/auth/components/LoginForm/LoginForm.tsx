import { useId, useState } from "react";
import { Box, Typography } from "@mui/material";

import Input from "@/ui/Input/Input";
import Button from "@/ui/Button/Button";
import { loginSchema } from "@/schemas";
import { useAuth } from "../../context/AuthContext";
import { styles } from "./LoginForm.styles";

interface LoginInterface {
  onLoginSuccessful: () => void;
}

export function LoginForm({ onLoginSuccessful }: LoginInterface) {
  const fieldId = useId();

  const [erorrs, setErorrs] = useState<Record<string, string>>({});
  const { authenticateUser } = useAuth();

  const handleSubmit = async (formData: FormData) => {
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

    setErorrs({});

    try {
      await authenticateUser(result.data.username, result.data.pass);
      onLoginSuccessful();
      console.log("close form");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box sx={styles.formContainer}>
      <Box component="form" sx={styles.form} action={handleSubmit}>
        <Typography variant="h4" component="h2" sx={styles.title}>
          Login
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
            htmlFor={`${fieldId}-pass`}
            sx={styles.label}
          >
            Password
          </Typography>
          <Input
            type="password"
            name="pass"
            id={`${fieldId}-pass`}
            autoComplete="current-password"
            placeholder="Password"
          />
          <Typography component="span" sx={styles.errorText}>
            {erorrs.pass}
          </Typography>
        </Box>

        <Button
          size="lg"
          type="submit"
          style={{ alignSelf: "center", minWidth: 180 }}
        >
          Login
        </Button>
      </Box>
    </Box>
  );
}
