import React from "react";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom";
import { I18nextProvider } from "react-i18next";
import "antd/dist/antd.min.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Router from "./router";
import i18n from "./translation";

const App = () => {
  return (
    <BrowserRouter>
      <I18nextProvider i18n={i18n}>
        <Router />
      </I18nextProvider>
    </BrowserRouter>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
