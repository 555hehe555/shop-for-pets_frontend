import { createTheme } from "@mui/material/styles";
import { HiOutlineChatBubbleBottomCenterText } from "react-icons/hi2";

export const theme = createTheme({
  palette: {
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
});
