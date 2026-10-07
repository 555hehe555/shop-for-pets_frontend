import type { SxProps, Theme } from "@mui/material";

export const styles: Record<string, SxProps<Theme>> = {
  profileContainer: (theme) => ({
    margin: "18px 20%",
    maxWidth: "800px",
    display: "flex",
    flexDirection: "column",

    "& .pageTitle": {
      fontSize: "24px",
      fontWeight: "bold",
      marginBottom: "16px",
    },

    "& .tableTitle": {
      fontSize: "20px",
      fontWeight: "bold",
      marginBottom: "8px",
    },

    "& .tableContainer": {
      marginTop: "24px",
      display: "flex",
      flexDirection: "column",
      gap: 1,
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

    "& .editButton": {
      marginTop: "16px",
      alignSelf: "flex-end",
    },

    "& .logoutButton": {
      marginTop: "32px",
      alignSelf: "flex-end",
    },
  }),
};
