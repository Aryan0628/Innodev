// main.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";

console.log("Auth0 domain =>", import.meta.env.VITE_INNODEV_AUTH0_DOMAIN);
console.log("Auth0 audience =>", import.meta.env.VITE_INNODEV_AUTH0_AUDIENCE);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Auth0Provider
      domain={import.meta.env.VITE_INNODEV_AUTH0_DOMAIN}
      clientId={import.meta.env.VITE_INNODEV_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: import.meta.env.VITE_INNODEV_AUTH0_AUDIENCE, // 👈 IMPORTANT
      }}
    >
      <App />
    </Auth0Provider>
  </StrictMode>
);
