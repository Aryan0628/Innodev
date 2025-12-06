// pages/Dashboard.jsx - Pure Frontend Version with Mock Data
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HeatmapSimulator from "../components/HeatmapSimulator";
import { MOCK_HEATMAP_PAYLOAD } from "../data/mockHeatmapData";
import { INDIA_STATES_GEOJSON } from "../data/indiaStatesGeoJSON";

function Dashboard() {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useAuth0();

  const [heatmapPayload, setHeatmapPayload] = useState(null);
  const [geojsonData, setGeojsonData] = useState(null);
  const [loadingData, setLoadingData] = useState(true);

  // Redirect to landing page if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/");
    }
  }, [isLoading, isAuthenticated, navigate]);

  // Load mock data when authenticated
  useEffect(() => {
    if (!isAuthenticated) return;

    console.log("📦 Loading mock data for dashboard...");
    setLoadingData(true);

    // Simulate async loading
    setTimeout(() => {
      try {
        setGeojsonData(INDIA_STATES_GEOJSON);
        setHeatmapPayload(MOCK_HEATMAP_PAYLOAD);
        console.log("✅ Mock data loaded successfully");
        console.log("GeoJSON features:", INDIA_STATES_GEOJSON.features.length);
        console.log("Time series frames:", MOCK_HEATMAP_PAYLOAD.time_series.length);
      } catch (err) {
        console.error("❌ Error loading mock data:", err);
      } finally {
        setLoadingData(false);
      }
    }, 500);
  }, [isAuthenticated]);

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
        <div className="text-center">
          <div className="text-xl mb-2">Loading dashboard...</div>
          <div className="text-sm text-gray-400">Loading mock India map data</div>
        </div>
      </div>
    );
  }

  // Authenticated and data loaded
  return (
    <div className="min-h-screen bg-black text-white">
      <HeatmapSimulator payload={heatmapPayload} geojson={geojsonData} />
    </div>
  );
}

export default Dashboard;