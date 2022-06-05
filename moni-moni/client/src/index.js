import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import store from "./store";
import { Provider } from "react-redux";
import { AppProvider } from "./context";
import { ThemeProvider, createTheme } from "@mui/material/styles";

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

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <AppProvider>
          <App />
        </AppProvider>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);
