// import 'modern-normalize'

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

import "@fontsource/roboto/400.css";
import "@fontsource/roboto/700.css";

import "@fontsource/lobster/400.css";

import "./styles/global.scss";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
