import type { SxProps, Theme } from "@mui/material";
import { radii } from "@/styles/radii";

export const styles: Record<string, SxProps<Theme>> = {
  cardContainer: (theme) => ({
    border: `1px solid ${theme.palette.divider}`,

    width: 300,
    height: "100%",
    background: theme.palette.background.paper,

    borderRadius: radii.lg,
    overflow: "hidden",
    boxShadow: 1,

    transition: "transform 0.25s ease, box-shadow 0.25s ease",

    "&:hover": {
      transform: "translateY(-4px)",
      boxShadow: 3,
    },

    "& .cardMedia": { width: "100%", height: 220, objectFit: "cover" },
    "& .cardTitle": {
      fontSize: "1.1rem",
      fontWeight: 600,
      lineHeight: 1.4,

      minHeight: 50,

      overflow: "hidden",
    },

    "& .price": {
      marginTop: 1,

      display: "flex",
      alignItems: "center",
      flexWrap: "wrap",

      gap: 1,
    },

    "& .currentPrice": {
      fontSize: "1.35rem",
      fontWeight: 700,
      color: theme.palette.tertiary.contrastText,
    },

    "& .oldPrice": {
      marginLeft: 1,

      fontSize: "0.95rem",
      color: theme.palette.tertiary.contrastText,

      textDecoration: "line-through",
    },

    "& .discount": {
      marginTop: 1,

      fontSize: "0.95rem",
      fontWeight: 600,

      color: theme.palette.success.main,

      minHeight: 4,
    },
  }),
};
