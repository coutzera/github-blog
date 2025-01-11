import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App.tsx";
import moment from "moment";
import "moment/dist/locale/pt-br";

// Configuração do locale
moment.locale("pt-br");

const rootElement = document.getElementById("root");

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
} else {
  console.error("Elemento root não encontrado.");
}
