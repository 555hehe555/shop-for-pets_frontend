// import 'modern-normalize'

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

import "@fontsource/roboto/400.css";
import "@fontsource/roboto/700.css";

import "@fontsource/lobster/400.css";

import "./styles/global.scss";
import { Toaster } from "react-hot-toast";
import CartProvider from "./features/cart/context/CartContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CartProvider>
      <Toaster position="bottom-right" toastOptions={{ duration: 3000 }} />
      <App />
    </CartProvider>
  </StrictMode>,
);
