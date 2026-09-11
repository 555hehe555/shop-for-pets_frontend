import type { SxProps, Theme } from "@mui/material";

export const styles: Record<string, SxProps<Theme>> = {
  form: (theme) => ({
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
    maxWidth: 450,
    margin: "0 auto",
    padding: "2rem",
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: "16px",
  }),
  title: {
    textAlign: "center",
    fontSize: "2rem",
    fontWeight: 700,
  },
  field: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  },
  label: (theme) => ({
    fontSize: "0.9rem",
    fontWeight: 600,
    color: theme.palette.text.secondary,
  }),
  submitButton: {
    alignSelf: "center",
    minWidth: 180,
  },
  errorText: (theme) => ({
    color: theme.palette.accent.main,
    fontSize: "0.875rem",
  }),
};
