import type { SxProps, Theme } from "@mui/material";

export const styles = {
  appBar: {
    backgroundColor: "header.bg",
    color: "header.text",
  } as SxProps<Theme>,
  toolbar: {
    justifyContent: "space-between",
    px: { xs: 2, md: 4 },
    py: "5px",
  } as SxProps<Theme>,
  logo: {
    color: "logo",
    textDecoration: "none",
  } as SxProps<Theme>,
  leftContainer: {
    width: "530px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  } as SxProps<Theme>,
  linksContainer: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    listStyle: "none",
    m: 0,
    p: 0,
  } as SxProps<Theme>,
  searchForm: {
    width: "250px",
  } as SxProps<Theme>,
  cartButton: {
    p: 0,
    "&:hover": {
      opacity: 0.7,
      transition: "0.5s ease",
    },
  } as SxProps<Theme>,
};
