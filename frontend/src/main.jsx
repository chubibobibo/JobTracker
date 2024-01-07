import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
//toastify alerts
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
    {/* render toastify container and specifying it's position */}
    <ToastContainer position='top-center' />
  </React.StrictMode>
);
