import Header from "@/components/layout/Header/Header.tsx";
import { Outlet } from "react-router-dom";
import Footer from "@/components/layout/Footer/Footer.tsx";
import { styles } from "./Layout.styles";
import { Box } from "@mui/material";

export function Layout() {
  return (
    <Box sx={styles.root}>
      <Header />
      <Outlet />
      <Footer />
    </Box>
  );
}
