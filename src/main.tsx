import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { IntlProvider } from "react-intl";
import "./index.css";
import App from "./App.tsx";
import "smarthr-ui/smarthr-ui.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <IntlProvider locale="ja" defaultLocale="ja">
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </IntlProvider>
  </StrictMode>
);
