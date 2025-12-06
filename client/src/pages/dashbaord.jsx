// pages/dashbaord.jsx
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HeatmapSimulator from "../components/HeatmapSimulator";

const API_BASE_URL = "http://localhost:8000";

function Dashboard() {
  const navigate = useNavigate();

  const { isAuthenticated, isLoading, getAccessTokenSilently} =
    useAuth0();

  const [heatmapPayload, setHeatmapPayload] = useState(null);
  const [geojsonData, setGeojsonData] = useState(null);
  const [loadingData, setLoadingData] = useState(false);

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
        console.log("Syncing user with token:", token);

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

  // Load data only when authenticated
  useEffect(() => {
    if (!isAuthenticated) return;

    setLoadingData(true);

    const loadData = async () => {
      try {
        // Load GeoJSON
        const module = await import("../data/indiaStatesGeoJSON");
        setGeojsonData(module.INDIA_STATES_GEOJSON);
        console.log("Loaded GeoJSON data",module.INDIA_STATES_GEOJSON);

        // Fetch heatmap data
        const token = await getAccessTokenSilently({
          authorizationParams: {
            audience: import.meta.env.VITE_INNODEV_AUTH0_AUDIENCE,
          },
        });

        console.log("Using token:", token);
        const response = await fetch(`${API_BASE_URL}/api/heatmap/data`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Heatmap data response:", response);

        if (response.ok) {
          const data = await response.json();
          setHeatmapPayload(data);
        } else {
          console.error("Failed to fetch heatmap data");
        }
      } catch (err) {
        console.error("Failed to load data:", err);
      } finally {
        setLoadingData(false);
      }
    };

    loadData();
  }, [isAuthenticated, getAccessTokenSilently]);

  // Auth0 is checking session
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="text-xl">Checking authentication...</div>
      </div>
    );
  }

  // Not authenticated → redirect to home
  if (!isAuthenticated) {
    return null;
  }

  // Authenticated but loading data
  if (loadingData || !geojsonData || !heatmapPayload) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="text-xl">Loading dashboard...</div>
      </div>
    );
  }

  // Authenticated and data loaded
  return (
    <div className="min-h-screen bg-black text-white">
      {heatmapPayload && geojsonData ? (
        <HeatmapSimulator payload={heatmapPayload} geojson={geojsonData} />
      ) : (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-xl">Loading heatmap data...</div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
