import type { SxProps, Theme } from "@mui/material";

export const styles = {
  footer: {
    backgroundColor: "header.bg",
    color: "header.text",
    textAlign: "center",
    py: 2,
    px: 2,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    position: "fixed",
    bottom: 0,
    width: "100%",
  } as SxProps<Theme>,
  copyright: {
    m: 0,
  } as SxProps<Theme>,
};
