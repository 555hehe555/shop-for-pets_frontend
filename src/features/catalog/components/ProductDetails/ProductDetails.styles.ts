import type { SxProps, Theme } from "@mui/material";

export const styles: Record<string, SxProps<Theme>> = {
  container: (theme) => ({
    maxWidth: 1200,
    margin: "0 auto",
    padding: "40px 20px",

    "& .product": {
      display: "grid",
      gridTemplateColumns: "420px 1fr",
      gap: "48px",
      alignItems: "start",
    },

    "& .gallery": {
      background: theme.palette.background.paper,
      border: `1px solid ${theme.palette.divider}`,
      borderRadius: theme.shape.borderRadius,
      padding: "24px",
      boxShadow: 1,
    },

    "& .image": {
      width: "100%",
      aspectRatio: "1",
      objectFit: "contain",
    },

    "& .info": {
      display: "flex",
      flexDirection: "column",
      gap: "18px",
    },

    "& .title": {
      fontSize: "2rem",
      lineHeight: 1.3,
      fontWeight: 700,
      color: theme.palette.text.primary,
    },

    "& .stock": {
      width: "fit-content",
      padding: "6px 14px",
      borderRadius: 999,
      background: "#eefaf0",
      color: theme.palette.success.main,
      fontWeight: 600,
    },

    "& .notInStock": {
      width: "fit-content",
      padding: "6px 14px",
      borderRadius: 999,
      background: "#fbeaea",
      color: theme.palette.error.main,
      fontWeight: 600,
    },

    "& .priceBlock": {
      display: "flex",
      alignItems: "center",
      gap: "12px",
      flexWrap: "wrap",
    },

    "& .newPrice": {
      fontSize: "2rem",
      fontWeight: 700,
      color: theme.palette.text.primary,
    },

    "& .oldPrice": {
      color: theme.palette.text.secondary,
      textDecoration: "line-through",
      fontSize: "1.2rem",
    },

    "& .discount": {
      color: theme.palette.accent.main,
      fontWeight: 600,
      fontSize: "1rem",
    },

    "& .actions": {
      marginTop: "12px",
      display: "flex",
      gap: "16px",
    },

    "& .description": {
      marginTop: "48px",
      background: theme.palette.background.paper,
      border: `1px solid ${theme.palette.divider}`,
      borderRadius: theme.shape.borderRadius,
      padding: "24px",
      boxShadow: 1,

      "& h2": {
        marginBottom: "16px",
        fontSize: "1.5rem",
      },

      "& p": {
        color: theme.palette.text.secondary,
        lineHeight: 1.7,
      },
    },

    [theme.breakpoints.down("md")]: {
      padding: "24px 16px",

      "& .product": {
        gridTemplateColumns: "1fr",
        gap: "24px",
      },

      "& .title": {
        fontSize: "1.6rem",
      },

      "& .newPrice": {
        fontSize: "1.7rem",
      },

      "& .actions": {
        flexDirection: "column",
        "& button": {
          width: "100%",
        },
      },
    },
  }),
};
