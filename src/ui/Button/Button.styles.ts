import type { SxProps, Theme } from "@mui/material";

const getButtonVariant = (
  bg: string,
  hover: string,
  textColor: string = "white",
  borderOverride?: string,
): SxProps<Theme> => ({
  backgroundColor: bg,
  color: textColor,
  borderColor: borderOverride || `color-mix(in srgb, ${bg} 82%, black)`,
  boxShadow: `
    inset 0 1px rgba(255, 255, 255, 0.35),
    0 2px 4px rgba(0, 0, 0, 0.08)
  `,
  "&:hover:not(:disabled)": {
    backgroundColor: hover,
    borderColor: borderOverride || `color-mix(in srgb, ${hover} 75%, black)`,
    boxShadow: `
      inset 0 1px rgba(255, 255, 255, 0.45),
      0 8px 16px rgba(0, 0, 0, 0.12)
    `,
  },
  "&:active:not(:disabled)": {
    boxShadow: "inset 0 2px 5px rgba(0, 0, 0, 0.12)",
  },
});

export const styles = {
  root: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "12px 20px",
    minWidth: "32px",
    border: "none",
    borderRadius: "12px",
    fontWeight: 600,
    cursor: "pointer",
    width: "fit-content",
    transition: "0.5s",

    "&:hover:not(:disabled)": {
      transform: "translateY(-2px)",
    },

    "&:active:not(:disabled)": {
      transform: "translateY(0)",
    },

    "&:disabled": {
      opacity: 0.6,
      cursor: "not-allowed",
    },
  },

  xs: {
    padding: "4px 10px",
    fontSize: "18px",
  },
  sm: {
    padding: "8px 14px",
    fontSize: "14px",
  },
  md: {
    padding: "12px 20px",
    fontSize: "16px",
  },
  lg: {
    padding: "16px 28px",
    fontSize: "18px",
  },
  primary: (theme: Theme) =>
    getButtonVariant(
      theme.palette.primary.main,
      theme.palette.primary.dark,
      theme.palette.primary.contrastText,
    ),
  secondary: (theme: Theme) =>
    getButtonVariant(
      theme.palette.secondary.main,
      theme.palette.secondary.dark,
      theme.palette.secondary.contrastText,
      `1px solid ${theme.palette.divider}`,
    ),
  tertiary: (theme: Theme) =>
    getButtonVariant(
      theme.palette.tertiary.main,
      theme.palette.tertiary.dark,
      theme.palette.tertiary.contrastText,
      `1px solid ${theme.palette.divider}`,
    ),
  success: (theme: Theme) =>
    getButtonVariant(theme.palette.success.main, theme.palette.success.dark),
  danger: (theme: Theme) =>
    getButtonVariant(theme.palette.error.main, theme.palette.error.dark),
};

