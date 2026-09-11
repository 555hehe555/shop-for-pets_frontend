import type { SxProps, Theme } from "@mui/material";

export const styles: Record<string, SxProps<Theme>> = {
  cartContainer: {
    position: "relative",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
  },
  cartCountContainer: (theme) => ({
    position: "absolute",
    top: "-5px",
    right: "-10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minWidth: "24px",
    height: "24px",
    padding: "0 6px",
    borderRadius: "12px",
    backgroundColor: theme.palette.accent.main,
    border: `2px solid ${theme.palette.divider}`,
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
    zIndex: 10,
    boxSizing: "border-box",
  }),
  cartCount: {
    fontSize: "12px",
    fontWeight: 700,
    lineHeight: 1,
    textAlign: "center",
    color: "white",
  },
  cartImg: {
    width: "36px",
    height: "36px",
    color: "white",
  },
};
