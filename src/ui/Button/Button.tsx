import type { ReactNode } from "react";
import { styles } from "./Button.styles";
import { ButtonBase, type ButtonBaseProps, type SxProps } from "@mui/material";
import type { Theme } from "@emotion/react";

interface BasicButtonProps extends ButtonBaseProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "tertiary" | "success" | "danger";
  size?: "xs" | "sm" | "md" | "lg";
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
    <ButtonBase
      className={className}
      sx={[styles.root, styles[variant], styles[size]] as SxProps<Theme>}
      disabled={disabled}
      {...props}
    >
      {children}
    </ButtonBase>
  );
}
