import type { Theme } from "@mui/material";

export const styles = {
  appBar: {
    backgroundColor: "header.bg",
    color: "header.text",

    px: { sm: 4, md: 8, lg: 16 },
  },
  toolbar: {
    justifyContent: "space-between",
    px: { xs: 2, sm: 4, md: 4 },
    py: "5px",
  },
  logo: (theme: Theme) => ({
    color: "logo",
    textDecoration: "none",
    fontFamily: theme.typography.fontLogo,
  }),
  leftContainer: {
    width: "530px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  linksContainer: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    listStyle: "none",
    m: 0,
    p: 0,
  },
  searchForm: {
    width: "250px",
  },
  cartButton: {
    p: 0,
    "&:hover": {
      opacity: 0.7,
      transition: "0.5s ease",
    },
  },

  profileButton: (theme: Theme) => ({
    transition: "0.5s ease",

    p: 1,
    border: "1px solid",
    borderColor: "divider",
    borderRadius: "10px",
    backgroundColor: theme.palette.secondary.main,

    "&:hover": {
      opacity: 0.7,
      transition: "0.5s ease",
    },
  }),
};
