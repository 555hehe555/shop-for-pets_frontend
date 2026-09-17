import Header from "@/components/layout/Header/Header.tsx";
import { Outlet } from "react-router-dom";
import Footer from "@/components/layout/Footer/Footer.tsx";

export function Layout() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
