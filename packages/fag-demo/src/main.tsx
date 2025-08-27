import "@unocss/reset/tailwind.css";
import "uno.css";

// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "@/App.tsx";

const rootElement = document.getElementById("root");

if (rootElement != null) {
  createRoot(rootElement).render(
    //<StrictMode>
    <App />,
    //</StrictMode>,
  );
}
