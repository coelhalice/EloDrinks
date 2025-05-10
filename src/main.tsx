import { createRoot } from "react-dom/client";
import "./style.css";
import React from "react";
import App from "./presentation/app";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
      <App />
      <ToastContainer 
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
  </React.StrictMode>,
);
