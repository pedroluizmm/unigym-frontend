import "./index.css";
import App from "./App.tsx";
import "keen-slider/keen-slider.min.css";
import "./LandingPage.css";
import { createRoot } from "react-dom/client";
import { StrictMode } from "react";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
