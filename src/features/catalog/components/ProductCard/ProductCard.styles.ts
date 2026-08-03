import type { SxProps, Theme } from "@mui/material";

export const styles: Record<string, SxProps<Theme>> = {
  cardContainer: (theme) => ({
    border: `1px solid ${theme.palette.divider}`,

    width: 300,
    background: `#fff`,

    borderRadius: 2,

    overflow: "hidden",

    boxShadow: 1,

    transition: "transform 0.25s ease, box-shadow 0.25s ease",

    "&:hover": {
      transform: "translateY(-4px)",
      boxShadow: 3,
    },
  }),
  cardMedia: { width: "100%", height: 220, objectFit: "cover" },
  cardTitle: {
    fontSize: "1.1rem",
    fontWeight: 600,
    lineHeight: 1.4,

    minHeight: 50,

    overflow: "hidden",
  },
};
