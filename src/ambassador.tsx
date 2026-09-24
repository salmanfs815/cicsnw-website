import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AmbassadorPage from "../app/ambassador/page";
import "../app/globals.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AmbassadorPage />
  </StrictMode>,
);
