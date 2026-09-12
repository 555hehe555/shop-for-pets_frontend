import type { SxProps } from "@mui/material";
import type { Theme } from "@mui/material/styles";

export const styles: Record<string, SxProps<Theme>> = {
  container: {
    width: "100%",
    p: 2.5,
    backgroundColor: "background.paper",
    border: "1px solid",
    borderColor: "divider",
    borderRadius: 2,
  },

  title: {
    mb: 2,
    fontWeight: 700,
    color: "text.primary",
  },

  group: {
    py: 1.5,
  },

  groupHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    cursor: "pointer",
    userSelect: "none",
  },

  groupTitle: {
    fontWeight: 600,
    color: "text.primary",
  },

  toggleButton: {
    p: 0.75,
    color: "text.secondary",
  },

  options: {
    mt: 1,
    gap: 0.25,
  },

  option: {
    m: 0,

    "& .MuiFormControlLabel-label": {
      fontSize: "0.9rem",
      color: "text.secondary",
    },
  },

  checkbox: {
    p: 0.75,
    color: "text.secondary",

    "&.Mui-checked": {
      color: "primary.main",
    },
  },

  divider: {
    borderColor: "divider",
  },
};
