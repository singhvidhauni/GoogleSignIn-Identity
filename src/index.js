import React from "react";
import App from "./App";
import { createRoot } from "react-dom/client";

const rootEle = document.getElementById("root");
const root = createRoot(rootEle);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
