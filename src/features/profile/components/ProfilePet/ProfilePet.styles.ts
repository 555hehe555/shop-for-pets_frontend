import type { SxProps, Theme } from "@mui/material";

export const styles: Record<string, SxProps<Theme>> = {
  profileContainer: (theme) => ({
    margin: "18px auto",
    minWidth: "1000px",
    display: "flex",
    flexDirection: "column",
    gap: "16px",

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
      width: "100%",
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
      width: "50%",
    },
    "& .tableSelect": {
      width: "300px",
      height: "46px",
      alignSelf: "end",
      boxSizing: "border-box",
      borderRadius: "12px",
      fontWeight: 500,
      backgroundColor: "background.paper",
      color: "text.primary",

      boxShadow: `
      inset 0 1px rgba(255, 255, 255, 0.35),
      0 2px 4px rgba(0, 0, 0, 0.08)
    `,

      transition: "border-color 0.3s, box-shadow 0.3s",

      "& .MuiSelect-select": {
        padding: "12px 40px 12px 20px",
      },

      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "divider",
      },

      "&:hover .MuiOutlinedInput-notchedOutline": {
        borderColor: "primary.main",
      },

      "&.Mui-focused": {
        boxShadow: "0 0 0 3px rgba(0, 0, 0, 0.08)",
      },

      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: "primary.main",
      },
    },
    "& .tableValue": {
      flex: "0 0 300px",
      fontSize: "16px",
    },
    "& .divader": {
      my: 1,
    },

    "& .button": {
      alignSelf: "flex-end",
    },

    "& .logoutButton": {
      marginTop: "32px",
      alignSelf: "flex-end",
    },

    "& .accordion": {
      border: `1px solid ${theme.palette.divider}`,
      borderRadius: "16px",
      boxShadow: theme.shadows[1],
    },
  }),
};
