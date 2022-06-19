import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import store from "./store";
import { Provider } from "react-redux";
import { AppProvider } from "./context";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const theme = createTheme({
  palette: {
    primary: {
      main: "#9e42f5",
    },
    secondary: {
      main: "#9e42f5",
    },
  },
});

const initialOptions = {
  "client-id": "test",
  currency: "USD",
  intent: "capture",
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <AppProvider>
          <PayPalScriptProvider options={initialOptions}>
            <App />
          </PayPalScriptProvider>
        </AppProvider>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);
