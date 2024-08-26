import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthContextProvider } from "./context/authContext.tsx";

createRoot(document.getElementById("root")!).render(
    <Router>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </Router>
);
