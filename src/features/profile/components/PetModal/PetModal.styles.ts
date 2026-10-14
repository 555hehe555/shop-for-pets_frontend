import type { SxProps, Theme } from "@mui/material";

export const styles: Record<string, SxProps<Theme>> = {
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
    minWidth: { xs: 280, sm: 400 },
    p: 3,
  },
  title: {
    textAlign: "center",
    fontSize: "1.75rem",
    fontWeight: 700,
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
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
};
