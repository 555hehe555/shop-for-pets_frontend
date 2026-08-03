// import 'modern-normalize'

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

import "@fontsource/roboto/400.css";
import "@fontsource/roboto/700.css";

import "@fontsource/lobster/400.css";

import { Toaster } from "react-hot-toast";
import CartProvider from "./features/cart/context/CartContext.tsx";
import AuthProvider from "./features/auth/context/AuthContext.tsx";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "./theme.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <AuthProvider>
        <CartProvider>
          <Toaster position="bottom-right" toastOptions={{ duration: 3000 }} />
          <App />
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>,
);
