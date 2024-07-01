import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import OnchainProviders from "../onchainProvider.tsx";
import "@coinbase/onchainkit/styles.css";
import GametProvider from "./context/index.tsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <OnchainProviders>
      <GametProvider>
        <App />
      </GametProvider>
    </OnchainProviders>
  </React.StrictMode>
);
