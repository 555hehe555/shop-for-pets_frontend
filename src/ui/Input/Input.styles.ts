import type { SxProps, Theme } from "@mui/material";

const getInputVariant = (
  bg: string,
  borderOverride: string,
  focus: string,
  textColor: string = "white",
  placeholderColor: string,
): SxProps<Theme> => ({
  backgroundColor: bg,
  color: textColor,
  borderColor: borderOverride || `color-mix(in srgb, ${bg} 82%, black)`,
  boxShadow: `
    inset 0 1px rgba(255, 255, 255, 0.35),
    0 2px 4px rgba(0, 0, 0, 0.08)
  `,

  "&::placeholder": {
    color: placeholderColor,
    opacity: 1,
  },

  "&:focus": {
    borderColor: focus,
    boxShadow: "0 0 0 3px rgba(0, 0, 0, 0.08)",
  },
});

export const styles = {
  root: {
    display: "block",
    width: "100%",
    boxSizing: "border-box",

    margin: 0,
    padding: "12px 20px",

    borderRadius: "12px",

    fontWeight: 500,

    outline: "none",

    transition: "border-color 0.3s, box-shadow 0.3s, background-color 0.3s",

    "&:disabled": {
      opacity: 0.6,
      cursor: "not-allowed",
    },
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
    getInputVariant(
      theme.palette.background.paper,
      theme.palette.divider,
      theme.palette.primary.main,
      theme.palette.text.primary,
      theme.palette.text.secondary,
    ),
  secondary: (theme: Theme) =>
    getInputVariant(
      theme.palette.background.default,
      theme.palette.divider,
      theme.palette.text.primary,
      theme.palette.text.primary,
      theme.palette.text.secondary,
    ),
  success: (theme: Theme) =>
    getInputVariant(
      theme.palette.background.paper,
      theme.palette.success.main,
      theme.palette.success.main,
      theme.palette.text.primary,
      theme.palette.text.secondary,
    ),
  danger: (theme: Theme) =>
    getInputVariant(
      theme.palette.background.paper,
      theme.palette.error.main,
      theme.palette.error.main,
      theme.palette.text.primary,
      theme.palette.text.secondary,
    ),
};
