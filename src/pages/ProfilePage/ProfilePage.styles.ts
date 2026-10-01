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
      flexDirection: "column",
      gap: 1,
      margin: "18px auto",
      maxWidth: "600px",
    },
    "& .tableInfo": {
      display: "flex",
      px: 3,
      py: 1,
      height: "52px",
      alignItems: "center",
      justifyContent: "space-between",
    },
    "& .tableLabel": {
      fontSize: "16px",
      flex: "0 0 150px",
    },
    "& .tableInput": {
      flex: "0 0 300px",
    },
    "& .tableValue": {
      flex: "0 0 300px",
      fontSize: "16px",
    },
  }),
};
