import { useId, useState } from "react";
import { Box, Typography } from "@mui/material";
import toast from "react-hot-toast";

import Input from "@/ui/Input/Input";
import Button from "@/ui/Button/Button";
import { loginSchema } from "@/schemas";
import { useAuth } from "../../context/AuthContext";
import { getAuthErrorMessage } from "../../utils/authError";
import { styles } from "./LoginForm.styles";

interface LoginInterface {
  onLoginSuccessful: () => void;
}

export function LoginForm({ onLoginSuccessful }: LoginInterface) {
  const fieldId = useId();

  const [erorrs, setErorrs] = useState<Record<string, string>>({});
  const [values, setValues] = useState({ username: "", pass: "" });
  const { authenticateUser } = useAuth();
  const [isPending, setIsPending] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = loginSchema.safeParse(values);

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
      await authenticateUser(result.data.username, result.data.pass);

      toast.success("Ви успішно увійшли.", { id: "login-success" });
      onLoginSuccessful();
    } catch (error) {
      toast.error(getAuthErrorMessage(error, "login"), {
        id: "login-error",
      });
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Box sx={styles.formContainer}>
      <Box
        component="form"
        sx={styles.form}
        onSubmit={handleSubmit}
      >
        <Typography variant="h4" component="h1" sx={styles.title}>
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
            value={values.pass}
            onChange={handleChange}
          />
          <Typography component="span" sx={styles.errorText}>
            {erorrs.pass}
          </Typography>
        </Box>

        <Button size="lg" type="submit" sx={styles.submitButton} disabled={isPending}>
          Login
        </Button>
      </Box>
    </Box>
  );
}
