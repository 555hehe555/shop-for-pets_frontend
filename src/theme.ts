import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    tertiary: Palette["primary"];
    accent: Palette["primary"];
  }
  interface PaletteOptions {
    tertiary?: PaletteOptions["primary"];
    accent?: PaletteOptions["primary"];
  }
}

export const theme = createTheme({
  palette: {
    background: {
      default: "#fff8f3",
      paper: "#ffffff",
    },

    primary: {
      main: "#f58a3a",
      dark: "#e87722",
      contrastText: "#fff",
    },
    secondary: {
      main: "#4fae9d",
      dark: "#429988",
      contrastText: "#fff",
    },
    tertiary: {
      main: "#f3ece6",
      dark: "#e7ddd5",
      contrastText: "#3a3a3a",
    },

    accent: {
      main: "#e95f4b",
      dark: "#da4f3b",
    },

    error: {
      main: "#d32f2f",
      dark: "#c62828",
    },
    warning: {
      main: "#ed6c02",
      dark: "#e65100",
    },
    info: {
      main: "#0288d1",
      dark: "#01579b",
    },
    success: {
      main: "#2e7d32",
      dark: "#1b5e20",
    },

    divider: "#e8ddd2",
  },

  shape: {
    borderRadius: 2,
  },
  typography: {
    fontFamily: '"Roboto", sans-serif',
  },
});
