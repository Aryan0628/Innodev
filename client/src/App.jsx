import { Routes, Route, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import Navbar from "./components/Navbar.jsx";
import LandingPage from "./pages/Landing";
import Dashboard from "./pages/dashbaord.jsx";

function App() {
  const { isAuthenticated, isLoading, error, user } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      console.error("Auth0 Error:", error);
    }
  }, [error]);

  useEffect(() => {
    if (!isLoading && isAuthenticated && user) {
      console.log("✅ User authenticated:", user);
      // Check if we're coming from Auth0 redirect (has code in URL)
      const urlParams = new URLSearchParams(window.location.search);
      const hasAuthCode = urlParams.has("code");
      const hasState = urlParams.has("state");
      
      // Navigate to dashboard if authenticated
      if (window.location.pathname === "/" || window.location.pathname === "" || hasAuthCode || hasState) {
        // Clean up URL parameters after Auth0 redirect
        if (hasAuthCode || hasState) {
          // Use setTimeout to ensure Auth0 SDK has finished processing
          setTimeout(() => {
            window.history.replaceState({}, document.title, "/dashboard");
            navigate("/dashboard", { replace: true });
          }, 100);
        } else {
          navigate("/dashboard", { replace: true });
        }
      }
    }
  }, [isAuthenticated, isLoading, navigate, user]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        <div className="text-center">
          <div className="mb-4 h-12 w-12 mx-auto border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Authentication Error</h1>
          <p className="text-red-400">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route
        path="/dashboard"
        element={
          isAuthenticated ? (
            <div className="min-h-screen bg-black text-white">
              <Navbar />
              <Dashboard />
            </div>
          ) : (
            <div className="flex min-h-screen items-center justify-center bg-black text-white">
              <div className="text-center">
                <p>Please log in to access the dashboard</p>
              </div>
            </div>
          )
        }
      />
    </Routes>
  );
}

export default App;
