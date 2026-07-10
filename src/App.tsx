import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "@/pages/HomePage/HomePage";
import ProductDetailsPage from "./pages/ProductDetailsPage/ProductDetailsPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import CartPage from "./pages/CartPage/CartPage";
import { Layout } from "./components/layout/Layout/Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/product/:id" element={<ProductDetailsPage />} />
          <Route path="/cart" element={<CartPage />} />

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
