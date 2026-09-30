import type { SxProps, Theme } from "@mui/material";

export const styles: Record<string, SxProps<Theme>> = {
  profileContainer: (theme) => ({
    "& .mainInfo": {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: 1,

      margin: 2,
    },

    "& .tableContainer": {
      display: "flex",
      m: 3,
    },
    "& .tableInfo": {
      display: "flex",
      flexWrap: "wrap",
      flexDirection: "column",
      justifyContent: "center",
      flex: 1,
    },
  }),
};
