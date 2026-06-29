import styles from "./Input.module.scss";
import type { InputHTMLAttributes } from "react";

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
    <input
      className={`
        ${styles.input}
        ${styles[variant]}
        ${styles[inputSize]}
        ${className ?? ""}
      `}
      {...props}
    />
  );
}
