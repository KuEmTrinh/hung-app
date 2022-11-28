import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import Product from "./features/product/Product";
import Guide from "./features/guide/Guide";
import Login from "./admin/Login";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AdminProduct from "./admin/dashboard/AdminProduct";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Product />,
      },
      {
        path: "/guide",
        element: <Guide />,
      },
    ],
  },
  {
    path: "/admin",
    element: <Login />,
    children: [
      {
        path: "/admin/product",
        element: <AdminProduct />,
      },
      {
        path: "/admin/guide",
        element: <Guide />,
      },
    ],
  },
]);

const container = document.getElementById("root");
const root = createRoot(container);
const theme = createTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: "#6f6af2",
    },
    secondary: {
      // This is green.A700 as hex.
      main: "#6f6af2",
    },
    whiteColor: {
      // This is green.A700 as hex.
      main: "#fff",
    },
  },
});
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
