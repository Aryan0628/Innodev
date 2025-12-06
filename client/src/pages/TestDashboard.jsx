// Test Dashboard - No Auth Required
import { useEffect, useState } from "react";
import HeatmapSimulator from "../components/HeatmapSimulator";

const API_BASE_URL = "http://localhost:8000";

function TestDashboard() {
  const [heatmapPayload, setHeatmapPayload] = useState(null);
  const [geojsonData, setGeojsonData] = useState(null);
  const [loadingData, setLoadingData] = useState(true);
  const [error, setError] = useState(null);

  // Load data without authentication
  useEffect(() => {
    setLoadingData(true);
    setError(null);

    const loadData = async () => {
      try {
        // First, check if server is running
        try {
          const healthCheck = await fetch(`${API_BASE_URL}/health`);
          if (!healthCheck.ok) {
            throw new Error(`Server health check failed: ${healthCheck.status}`);
          }
          console.log("✅ Server is running");
        } catch (healthErr) {
          throw new Error(`Cannot connect to backend server at ${API_BASE_URL}. Make sure the server is running.`);
        }

        // Load GeoJSON
        const module = await import("../data/indiaStatesGeoJSON");
        setGeojsonData(module.INDIA_STATES_GEOJSON);
        console.log("✅ GeoJSON loaded");

        // Fetch heatmap data without auth token (using public endpoint)
        console.log("📡 Fetching heatmap data from:", `${API_BASE_URL}/api/heatmap/data/public`);
        const response = await fetch(`${API_BASE_URL}/api/heatmap/data/public`, {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
        });

        // Get response text first to check what we're actually receiving
        const responseText = await response.text();
        console.log("📥 Response status:", response.status);
        console.log("📥 Response preview:", responseText.substring(0, 200));
        
        if (!response.ok) {
          throw new Error(`Server error (${response.status}): ${responseText.substring(0, 200)}`);
        }

        // Try to parse as JSON
        let data;
        try {
          data = JSON.parse(responseText);
          console.log("✅ JSON parsed successfully");
        } catch (parseError) {
          console.error("❌ Response was not valid JSON:", responseText);
          throw new Error(`Invalid JSON response from server. Response: ${responseText.substring(0, 200)}...`);
        }

        if (!data || !data.data) {
          throw new Error("Invalid data format received from server");
        }

        setHeatmapPayload(data);
        console.log("✅ Heatmap data loaded successfully");
      } catch (err) {
        console.error("❌ Failed to load data:", err);
        // Provide more helpful error message
        if (err.message.includes("fetch") || err.message.includes("Cannot connect")) {
          setError(`Cannot connect to backend server. Make sure it's running on ${API_BASE_URL}`);
        } else {
          setError(err.message);
        }
      } finally {
        setLoadingData(false);
      }
    };

    loadData();
  }, []);

  // Loading state
  if (loadingData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="text-center">
          <div className="text-xl mb-2">Loading dashboard...</div>
          <div className="text-sm text-gray-400">Loading GeoJSON and heatmap data</div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="text-center max-w-md">
          <div className="text-xl mb-4 text-red-400">Error Loading Data</div>
          <div className="text-sm text-gray-400 mb-4">{error}</div>
          <div className="text-xs text-gray-500">
            Make sure your backend server is running on {API_BASE_URL}
          </div>
        </div>
      </div>
    );
  }

  // Render heatmap
  if (heatmapPayload && geojsonData) {
    return (
      <div className="min-h-screen bg-black text-white">
        <div className="bg-yellow-900/20 border-b border-yellow-700/50 px-4 py-2 text-center text-sm">
          <span className="text-yellow-400">⚠️ Test Mode - No Authentication Required</span>
          <span className="text-gray-400 ml-2">|</span>
          <a href="/dashboard" className="text-blue-400 hover:text-blue-300 ml-2">
            Go to Authenticated Dashboard
          </a>
        </div>
        <HeatmapSimulator payload={heatmapPayload} geojson={geojsonData} />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="text-xl">No data available</div>
    </div>
  );
}

export default TestDashboard;

