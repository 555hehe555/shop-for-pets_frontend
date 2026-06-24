import type { ReactNode, ComponentPropsWithoutRef } from "react";
import styles from "./Button.module.scss";

interface BasicButtonProps extends ComponentPropsWithoutRef<"button"> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "success" | "danger";
  size?: "sm" | "md" | "lg";
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  disabled = false,
  className = "",
  ...props
}: BasicButtonProps) {
  return (
    <button
      className={`
        ${styles.button}
        ${styles[variant]}
        ${styles[size]}
        ${className} 
      `.trim()}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
