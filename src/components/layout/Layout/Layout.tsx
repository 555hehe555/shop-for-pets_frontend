import Header from "@/components/layout/Header/Header.tsx";
import { Outlet } from "react-router-dom";
import Footer from "@/components/layout/Footer/Footer.tsx";

export function Layout() {
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
