// main.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";
import { BrowserRouter, useNavigate } from "react-router-dom";

const domain = import.meta.env.VITE_INNODEV_AUTH0_DOMAIN;
const clientId = import.meta.env.VITE_INNODEV_AUTH0_CLIENT_ID;
const audience = import.meta.env.VITE_INNODEV_AUTH0_AUDIENCE;

// Get current origin dynamically - works on any port/domain
const currentOrigin = window.location.origin;
const currentHost = window.location.host;
const isLocalhost = currentHost.includes('localhost') || currentHost.includes('127.0.0.1');

// Determine redirect URI - use explicit origin to ensure it matches Auth0 settings
// This works on any port, domain, or environment
const redirectUri = import.meta.env.VITE_INNODEV_AUTH0_REDIRECT_URI || currentOrigin;

if (!domain || !clientId || !audience) {
  console.error("❌ Missing Auth0 environment variables. Please check your .env file.");
  console.error("Required: VITE_INNODEV_AUTH0_DOMAIN, VITE_INNODEV_AUTH0_CLIENT_ID, VITE_INNODEV_AUTH0_AUDIENCE");
} else {
  console.log("✅ Auth0 Configuration:");
  console.log("   Domain:", domain);
  console.log("   Client ID:", clientId?.substring(0, 10) + "...");
  console.log("   Audience:", audience);
  console.log("   Redirect URI:", redirectUri);
  console.log("   Current Origin:", currentOrigin);
  
  if (isLocalhost) {
    console.log("💡 Development Mode Detected");
    console.log("   To make this work on any port, add these patterns to Auth0:");
    console.log("   - http://localhost:*");
    console.log("   - http://127.0.0.1:*");
    console.log("   Or add your specific URL:", redirectUri);
  }
}

// Component to handle Auth0 redirect callback
const Auth0ProviderWithRedirectCallback = ({ children }) => {
  const navigate = useNavigate();

  const onRedirectCallback = (appState) => {
    // Handle redirect after login - works on any route
    const returnTo = appState?.returnTo || "/dashboard";
    console.log("🔄 Redirecting to:", returnTo);
    navigate(returnTo, { replace: true });
  };

  // Only render Auth0Provider if we have the required config
  if (!domain || !clientId || !audience) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        flexDirection: 'column',
        color: 'white',
        backgroundColor: 'black'
      }}>
        <h1>⚠️ Auth0 Configuration Missing</h1>
        <p>Please check your environment variables</p>
        <p style={{ fontSize: '0.8em', marginTop: '1em' }}>
          Required: VITE_INNODEV_AUTH0_DOMAIN, VITE_INNODEV_AUTH0_CLIENT_ID, VITE_INNODEV_AUTH0_AUDIENCE
        </p>
      </div>
    );
  }

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        audience: audience,
        redirect_uri: redirectUri, // Explicitly set to current origin - works on any port/domain
      }}
      useRefreshTokens={true}
      cacheLocation="localstorage"
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Auth0ProviderWithRedirectCallback>
        <App />
      </Auth0ProviderWithRedirectCallback>
    </BrowserRouter>
  </StrictMode>
);
