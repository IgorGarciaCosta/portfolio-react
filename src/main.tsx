import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ParticlesProvider } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { ThemeProvider } from "@/contexts/ThemeContext";
import "./index.css";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ParticlesProvider init={loadSlim}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </ParticlesProvider>
  </StrictMode>,
);
