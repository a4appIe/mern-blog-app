import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import App from "./App.jsx";
import "./index.css";
import Navbar from "./components/Navbar.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
    <Toaster />
  </BrowserRouter>
);
