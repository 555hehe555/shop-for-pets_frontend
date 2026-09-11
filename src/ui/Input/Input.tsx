import { type SxProps } from "@mui/material";
import { styles } from "./Input.styles";
import type { InputHTMLAttributes } from "react";
import { Box } from "@mui/system";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: "primary" | "secondary" | "success" | "danger";
  inputSize?: "sm" | "md" | "lg";
}

export default function Input({
  variant = "primary",
  inputSize = "md",
  className,
  ...props
}: InputProps) {
  return (
    <Box
      component="input"
      className={className}
      sx={[styles.root, styles[variant], styles[inputSize]] as SxProps}
      {...props}
    />
  );
}
