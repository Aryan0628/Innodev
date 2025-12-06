// pages/Dashboard.jsx - Updated with Leaflet map
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import IndiaMap from "../components/IndiaMap";
import { INDIA_STATES_GEOJSON } from "../data/indiaStatesGeoJSON";

function Dashboard() {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useAuth0();
  const [geojsonData, setGeojsonData] = useState(null);
  const [loadingData, setLoadingData] = useState(true);
  const [error, setError] = useState(null);

  // Redirect to landing page if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/");
    }
  }, [isLoading, isAuthenticated, navigate]);

  // Load mock data when authenticated
  useEffect(() => {
    if (!isAuthenticated) return;

    console.log("📦 Loading data for dashboard...");
    setLoadingData(true);
    setError(null);

    // Simulate async loading (in production, this would be an API call)
    setTimeout(() => {
      try {
        // Load GeoJSON
        setGeojsonData(INDIA_STATES_GEOJSON);
        
        
        console.log("✅ Data loaded successfully");
        console.log("GeoJSON features:", INDIA_STATES_GEOJSON.features.length);
      } catch (err) {
        console.error("❌ Error loading data:", err);
        setError("Failed to load map data. Please refresh the page.");
      } finally {
        setLoadingData(false);
      }
    }, 500);
  }, [isAuthenticated]);

  // Auth0 is checking session
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="text-center">
          <div className="text-xl mb-2">Checking authentication...</div>
          <div className="text-sm text-gray-400">Please wait</div>
        </div>
      </div>
    );
  }

  // Not authenticated → redirect to home (handled by useEffect)
  if (!isAuthenticated) {
    return null;
  }

  // Show error if data loading failed
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="text-center max-w-md">
          <div className="text-xl mb-2 text-red-400">❌ {error}</div>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
          >
            Reload Page
          </button>
        </div>
      </div>
    );
  }

  // Authenticated but loading data
  if (loadingData || !geojsonData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="text-center">
          <div className="text-xl mb-2">Loading dashboard...</div>
          <div className="text-sm text-gray-400">Preparing India map visualization</div>
        </div>
      </div>
    );
  }

  // Authenticated and data loaded - show map
  return (
    <div className="min-h-screen bg-black">
      {/* Map takes full available height below navbar */}
      <div className="h-[calc(100vh-80px)]">
        <IndiaMap 
          geojsonData={geojsonData}
        />
      </div>
    </div>
  );
}

export default Dashboard;