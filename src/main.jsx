import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { App as AntdApp } from "antd"; // a wrapper to use antd toast messages
import store from "./store";
import "./index.css";
import "antd/dist/reset.css";
import App from "./App";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <AntdApp>
        <App />
      </AntdApp>
    </Provider>
  </StrictMode>
);
