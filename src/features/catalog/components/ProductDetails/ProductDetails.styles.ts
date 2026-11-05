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
      position: "relative",
    },

    "& .sliderWrapper": {
      width: "100%",
      height: "100%",
      aspectRatio: "1",
      overflow: "hidden",
      position: "relative",
    },

    "& .image": {
      width: "100%",
      aspectRatio: "1",
      objectFit: "contain",
      position: "absolute",
      top: 0,
      left: 0,
    },

    "& .navButton": {
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      borderRadius: "50%",
    },

    "& .navButtonPrev": {
      left: -10,
    },

    "& .navButtonNext": {
      right: -10,
    },

    "& .dots": {
      position: "absolute",
      bottom: 10,
      left: "50%",
      transform: "translateX(-50%)",
      display: "flex",
      gap: "8px",
    },

    "& .dot": {
      width: 10,
      height: 10,
      borderRadius: "50%",
      backgroundColor: "lightgray",

      "&.active": {
        backgroundColor: theme.palette.primary.main,
      },
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
      padding: "4px 12px",
      borderRadius: 999,
      fontWeight: 600,
      color: theme.palette.primary.contrastText,
      boxShadow: `
      inset 0 1px rgba(183, 200, 182, 0.45),
      0 8px 16px rgba(0, 0, 0, 0.12)
    `,

      "&.available": {
        // color: theme.palette.success.main,
        backgroundColor: theme.palette.success.main,
      },

      "&.notAvailable": {
        // color: theme.palette.error.main,
        backgroundColor: theme.palette.error.main,
      },
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

      "& h2, & .descriptionTitle": {
        marginBottom: "16px",
        fontSize: "1.5rem",
      },

      "& p, & .descriptionText": {
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
