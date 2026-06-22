import type { ReactNode } from "react";
import styles from "./Button.module.scss";

interface BasicButtonProps {
  // text: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "success" | "danger";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  onClick?: () => void;
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  disabled = false,
  onClick,
}: BasicButtonProps) {
  return (
    <button
      className={`
        ${styles.button}
        ${styles[variant]}
        ${styles[size]}
      `}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
