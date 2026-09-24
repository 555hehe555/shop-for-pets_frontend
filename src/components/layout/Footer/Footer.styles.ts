import type { SxProps, Theme } from "@mui/material";

export const styles = {
  footer: {
    backgroundColor: "header.bg",
    color: "header.text",
    textAlign: "center",
    py: 2,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: "100%",
    height: "64px",
    px: { sm: 4, md: 8, lg: 16 },
  } as SxProps<Theme>,
  copyright: {
    m: 0,
  } as SxProps<Theme>,
};
