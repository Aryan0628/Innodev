// pages/dashbaord.jsx
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = "http://localhost:8000"; 

function Dashboard() {
  const navigate = useNavigate();

  const {
    isAuthenticated,
    isLoading,
    getAccessTokenSilently,
    logout,
  } = useAuth0();

  // Redirect to landing page if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/");
    }
  }, [isLoading, isAuthenticated, navigate]);

  // Sync user with backend when authenticated
  useEffect(() => {
    const syncUser = async () => {
      if (!isAuthenticated) return;

      try {
        const token = await getAccessTokenSilently({
          authorizationParams: {
            audience: import.meta.env.VITE_INNODEV_AUTH0_AUDIENCE,
          },
        });
        console.log("Obtained access token:", token);

        await fetch(`${API_BASE_URL}/api/users/me`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

      } catch (err) {
        console.error("User sync failed:", err);
      }
    };

    syncUser();
  }, [isAuthenticated, getAccessTokenSilently]);

  // Loading state while Auth0 checks session
  if (isLoading) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  // Not authenticated → already redirected
  if (!isAuthenticated) {
    return null;
  }

  // Authenticated view
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white space-y-6">
      <h1 className="text-4xl font-bold tracking-wide">
        Welcome to the website
      </h1>

      {/* Logout button */}
      <button
        onClick={() =>
          logout({
            logoutParams: { returnTo: window.location.origin },
          })
        }
        className="px-6 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition-colors"
      >
        Log Out
      </button>
    </div>
  );
}

export default Dashboard;
