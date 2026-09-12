import type { SxProps, Theme } from "@mui/material";

export const styles: Record<string, SxProps<Theme>> = {
  formContainer: {
    minHeight: "calc(100vh - 70px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
    maxWidth: 600,
  },
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
