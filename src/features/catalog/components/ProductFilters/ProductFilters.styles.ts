import type { SxProps } from "@mui/material";
import type { Theme } from "@mui/material/styles";
import { radii } from "@/styles/radii";

export const styles: Record<string, SxProps<Theme>> = {
  container: (theme) => ({
    width: "100%",
    minWidth: 0,
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: radii.lg,
    boxShadow: theme.shadows[1],
  }),

  panelHeader: (theme) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 2,
    width: "100%",
    minHeight: 64,
    px: { xs: 2, sm: 2.5 },
    py: 1.5,
    color: theme.palette.tertiary.contrastText,
    textAlign: "left",
    backgroundColor: theme.palette.tertiary.main,
    borderBottom: `1px solid ${theme.palette.divider}`,
    transition: theme.transitions.create("background-color", {
      duration: theme.transitions.duration.shorter,
    }),

    "&:hover": {
      backgroundColor: theme.palette.tertiary.dark,
    },

    "&:focus-visible, &.Mui-focusVisible": {
      outline: `3px solid ${theme.alpha(theme.palette.primary.main, 0.35)}`,
      outlineOffset: -3,
    },

    "&:hover .filter-toggle, &:focus-visible .filter-toggle, &.Mui-focusVisible .filter-toggle":
      {
        color: theme.palette.primary.contrastText,
        backgroundColor: theme.palette.primary.main,
      },
  }),

  title: (theme) => ({
    fontSize: { xs: "1.1rem", sm: "1.2rem" },
    fontWeight: 700,
    lineHeight: 1.3,
    letterSpacing: "0.01em",
    color: theme.palette.tertiary.contrastText,
  }),

  group: {
    px: { xs: 2, sm: 2.5 },
    py: 1.5,

    "&:last-of-type": {
      pb: 2.5,
    },
  },

  groupHeader: (theme) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 1.5,
    width: "100%",
    minHeight: 40,
    mx: -0.75,
    px: 0.75,
    py: 0.5,
    color: theme.palette.text.primary,
    textAlign: "left",
    borderRadius: radii.sm,
    transition: theme.transitions.create("background-color", {
      duration: theme.transitions.duration.shorter,
    }),

    "&:hover": {
      backgroundColor: theme.alpha(theme.palette.primary.main, 0.06),
    },

    "&:focus-visible, &.Mui-focusVisible": {
      outline: `2px solid ${theme.alpha(theme.palette.primary.main, 0.5)}`,
      outlineOffset: -2,
    },

    "&:hover .filter-toggle, &:focus-visible .filter-toggle, &.Mui-focusVisible .filter-toggle":
      {
        color: theme.palette.primary.contrastText,
        backgroundColor: theme.palette.primary.main,
      },
  }),

  groupTitle: (theme) => ({
    fontSize: "0.8125rem",
    fontWeight: 700,
    lineHeight: 1.5,
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    color: theme.palette.text.primary,
  }),

  toggleButton: (theme) => ({
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    width: 32,
    height: 32,
    color: theme.palette.primary.dark,
    backgroundColor: theme.alpha(theme.palette.primary.main, 0.12),
    borderRadius: radii.sm,
    transition: theme.transitions.create(
      ["background-color", "color", "transform"],
      { duration: theme.transitions.duration.shorter },
    ),

    "& svg": {
      display: "block",
    },
  }),

  options: {
    width: "100%",
    mt: 1,
    gap: 0.25,
  },

  option: (theme) => ({
    m: 0,
    width: "calc(100% + 12px)",
    minHeight: 36,
    mx: -0.75,
    px: 0.75,
    py: 0.25,
    borderRadius: radii.sm,
    transition: theme.transitions.create("background-color", {
      duration: theme.transitions.duration.shorter,
    }),

    "&:hover": {
      backgroundColor: theme.alpha(theme.palette.primary.main, 0.06),
    },

    "&:focus-within": {
      backgroundColor: theme.alpha(theme.palette.primary.main, 0.08),
    },

    "&:has(.Mui-checked)": {
      backgroundColor: theme.alpha(theme.palette.primary.main, 0.04),
    },

    "&:has(.Mui-checked):hover": {
      backgroundColor: theme.alpha(theme.palette.primary.main, 0.09),
    },

    "& .MuiFormControlLabel-label": {
      ml: 0.25,
      fontSize: "0.9rem",
      lineHeight: 1.45,
      color: theme.palette.text.secondary,
      overflowWrap: "anywhere",
      transition: theme.transitions.create("color", {
        duration: theme.transitions.duration.shorter,
      }),
    },

    "&:hover .MuiFormControlLabel-label, &:focus-within .MuiFormControlLabel-label, &:has(.Mui-checked) .MuiFormControlLabel-label":
      {
        color: theme.palette.text.primary,
      },

    "&:has(.Mui-checked) .MuiFormControlLabel-label": {
      fontWeight: 500,
    },
  }),

  checkbox: (theme) => ({
    p: 0.75,
    ml: -0.75,
    color: theme.palette.text.secondary,
    transition: theme.transitions.create(
      ["color", "background-color", "box-shadow"],
      { duration: theme.transitions.duration.shorter },
    ),

    "& .MuiSvgIcon-root": {
      fontSize: 20,
    },

    "&:hover": {
      backgroundColor: theme.alpha(theme.palette.primary.main, 0.1),
    },

    "&.Mui-checked": {
      color: theme.palette.primary.main,
    },

    "&.Mui-focusVisible": {
      backgroundColor: theme.alpha(theme.palette.primary.main, 0.12),
      boxShadow: `0 0 0 2px ${theme.alpha(theme.palette.primary.main, 0.4)}`,
    },
  }),

  divider: (theme) => ({
    mx: { xs: 2, sm: 2.5 },
    borderColor: theme.palette.divider,
    opacity: 1,
  }),
};
