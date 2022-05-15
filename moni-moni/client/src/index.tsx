import React from "react";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom";
import "antd/dist/antd.min.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Router from "./router";

const App = () => {
  return (
    <BrowserRouter>
        <Router />
    </BrowserRouter>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
