import type { SxProps } from "@mui/material";
import type { Theme } from "@mui/material/styles";

export const styles: Record<string, SxProps<Theme>> = {
  container: {
    display: "flex",
    gap: 3,
    p: 3,
    alignItems: "flex-start",

    flexDirection: {
      xs: "column",
      md: "row",
    },
  },

  filters: {
    width: {
      xs: "100%",
      md: 250,
    },
    flexShrink: 0,
  },

  productsContainer: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 4,
    minWidth: 0,
  },

  grid: {
    width: "100%",
  },

  pagination: {},
};
