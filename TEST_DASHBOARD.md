# Test Dashboard - Quick Access

## 🚀 Access Test Dashboard (No Login Required)

### Option 1: Direct URL
Navigate to: **http://localhost:5173/test-dashboard**

### Option 2: From Home Page
1. Go to the home page: **http://localhost:5173/**
2. Click the button: **"🗺️ View Test Dashboard (No Login Required)"**

## ✅ What Works

- ✅ **No Authentication Required** - Bypasses Auth0 completely
- ✅ **Full Heatmap Functionality** - All features work:
  - Interactive India map
  - Color-coded states based on data
  - Play/Pause animation controls
  - Frame slider for time series
  - Export SVG/PNG functionality
  - Zoom and pan on map
  - Hover tooltips on states

## 📋 Requirements

1. **Backend Server Running**
   ```bash
   cd server
   npm run dev
   ```
   Server should be on `http://localhost:8000`

2. **Frontend Server Running**
   ```bash
   cd client
   npm run dev
   ```
   Frontend should be on `http://localhost:5173` (or your configured port)

## 🔍 Testing the Map

1. Open **http://localhost:5173/test-dashboard**
2. Wait for data to load (GeoJSON + Heatmap data)
3. You should see:
   - India map with colored states
   - Control panel with Play/Pause button
   - Frame slider (if time series data exists)
   - Export buttons

## 🐛 Troubleshooting

### "Error Loading Data"
- Make sure backend server is running on port 8000
- Check browser console for detailed error messages
- Verify the API endpoint: `http://localhost:8000/api/heatmap/data/public`

### Map Not Showing
- Check browser console for errors
- Verify GeoJSON file exists: `client/src/data/states.geojson`
- Check that D3.js is loaded properly

### States Not Colored
- Check that state mapping is working (see `client/src/utils/stateMapping.js`)
- Verify backend is returning data with correct `region_id` format (e.g., "IN-UP", "IN-MH")

## 🔄 Switch Between Test and Authenticated Dashboard

- **Test Dashboard**: `/test-dashboard` (No auth)
- **Authenticated Dashboard**: `/dashboard` (Requires Auth0 login)

Both use the same heatmap component, so functionality is identical!

