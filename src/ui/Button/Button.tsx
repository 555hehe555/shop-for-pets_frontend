import type { ReactNode } from "react";
import { styles } from "./Button.styles";
import { ButtonBase, type ButtonBaseProps, type SxProps } from "@mui/material";
import type { Theme } from "@emotion/react";

interface BasicButtonProps extends ButtonBaseProps {
  children: ReactNode;
  variant?:
    | "primary"
    | "secondary"
    | "tertiary"
    | "success"
    | "danger"
    | "text";
  size?: "xs" | "sm" | "md" | "lg" | "manual";
}

export default function Button({
  sx,
  children,
  variant = "primary",
  size = "md",
  disabled = false,
  className = "",
  ...props
}: BasicButtonProps) {
  const customSx = Array.isArray(sx) ? sx : [sx];

  return (
    <ButtonBase
      className={className}
      sx={
        [
          styles.root,
          styles[variant],
          styles[size],
          ...customSx,
        ] as SxProps<Theme>
      }
      disabled={disabled}
      {...props}
    >
      {children}
    </ButtonBase>
  );
}
