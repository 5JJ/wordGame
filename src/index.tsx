import React from "react";
import { createRoot } from "react-dom/client";

import GlobalStyle from "./styles/GlobalStyle";
import App from "App";

const container = document.getElementById("main");
const root = createRoot(container);

root.render(
  <>
    <GlobalStyle />
    <App />
  </>
);
