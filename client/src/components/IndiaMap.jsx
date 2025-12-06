import { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, GeoJSON, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Play, Pause } from 'lucide-react';
import { getColorForValue, processMapData } from '../utils/mapHelpers';

// Component to fit map bounds
function FitBounds({ geojson }) {
  const map = useMap();
  
  useEffect(() => {
    if (geojson) {
      const bounds = L.geoJSON(geojson).getBounds();
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [geojson, map]);
  
  return null;
}

const IndiaMap = ({ geojsonData, heatmapPayload }) => {
  const [visualizationActive, setVisualizationActive] = useState(false);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [enrichedGeoJSON, setEnrichedGeoJSON] = useState(null);
  const [selectedFeature, setSelectedFeature] = useState(null);
  const geoJsonLayerRef = useRef(null);
  const animationRef = useRef(null);

  // Get current data based on frame
  const getCurrentData = () => {
    if (!heatmapPayload) return [];
    
    if (heatmapPayload.time_series && heatmapPayload.time_series.length > 0) {
      return heatmapPayload.time_series[currentFrame]?.data || heatmapPayload.data;
    }
    
    return heatmapPayload.data;
  };

  // Process and enrich GeoJSON with data
  useEffect(() => {
    if (!geojsonData || !heatmapPayload) return;
    
    const currentData = getCurrentData();
    const processed = processMapData(geojsonData, currentData, visualizationActive);
    setEnrichedGeoJSON(processed);
  }, [geojsonData, heatmapPayload, currentFrame, visualizationActive]);

  // Animation loop for time series
  useEffect(() => {
    if (!isPlaying || !heatmapPayload?.time_series) return;
    
    const maxFrames = heatmapPayload.time_series.length;
    
    animationRef.current = setInterval(() => {
      setCurrentFrame(prev => {
        if (prev >= maxFrames - 1) {
          setIsPlaying(false);
          return 0;
        }
        return prev + 1;
      });
    }, 500); // 500ms per frame
    
    return () => {
      if (animationRef.current) {
        clearInterval(animationRef.current);
      }
    };
  }, [isPlaying, heatmapPayload]);

  // Style function for GeoJSON features
  const style = (feature) => {
    const value = feature.properties.heatmap_value;
    const fillColor = visualizationActive && value !== null && value !== undefined
      ? getColorForValue(value)
      : '#e5e7eb';
    
    return {
      fillColor,
      fillOpacity: 0.7,
      color: '#fff',
      weight: 1,
      opacity: 1,
    };
  };

  // Event handlers for interactivity
  const onEachFeature = (feature, layer) => {
    layer.on({
      mouseover: (e) => {
        const layer = e.target;
        layer.setStyle({
          weight: 2,
          color: '#333',
          fillOpacity: 0.9,
        });
        
        setSelectedFeature({
          name: feature.properties.ST_NM || feature.properties.name || 'Unknown',
          value: feature.properties.heatmap_value,
          position: e.latlng,
        });
      },
      mouseout: (e) => {
        if (geoJsonLayerRef.current) {
          geoJsonLayerRef.current.resetStyle(e.target);
        }
        setSelectedFeature(null);
      },
      click: (e) => {
        console.log('Clicked:', feature.properties);
        // Future: Handle click for drill-down to districts
      },
    });
  };

  const handleStartVisualization = () => {
    setVisualizationActive(true);
    setCurrentFrame(0);
    
    if (heatmapPayload?.time_series && heatmapPayload.time_series.length > 0) {
      setTimeout(() => setIsPlaying(true), 300);
    }
  };

  const hasTimeSeries = heatmapPayload?.time_series && heatmapPayload.time_series.length > 0;

  return (
    <div className="w-full h-full flex flex-col bg-black text-white">
      {/* Header */}
      <div className="p-6 pb-4">
        <p className="text-sm text-gray-400">
          {visualizationActive 
            
          }
        </p>
      </div>

      {/* Map Container */}
      <div className="flex-1 relative">
        <MapContainer
          center={[22.5, 79.0]}
          zoom={5}
          className="w-full h-full"
          style={{ background: '#1a1a1a' }}
          zoomControl={true}
          scrollWheelZoom={true}
        >
          {/* Dark tile layer */}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png"
          />
          
          {/* GeoJSON Layer */}
          {enrichedGeoJSON && (
            <>
              <GeoJSON
                key={`geojson-${currentFrame}-${visualizationActive}`}
                data={enrichedGeoJSON}
                style={style}
                onEachFeature={onEachFeature}
                ref={geoJsonLayerRef}
              />
              <FitBounds geojson={enrichedGeoJSON} />
            </>
          )}
        </MapContainer>

        {/* Tooltip */}
        {selectedFeature && (
          <div
            className="absolute z-[1000] bg-gray-900 text-white px-4 py-2 rounded-lg shadow-lg border border-gray-700 pointer-events-none"
            style={{
              left: '50%',
              top: '20px',
              transform: 'translateX(-50%)',
            }}
          >
            <div className="font-semibold">{selectedFeature.name}</div>
            <div className="text-sm text-gray-300">
              Value: {selectedFeature.value !== null && selectedFeature.value !== undefined 
                ? selectedFeature.value.toFixed(2) 
                : 'No data'}
            </div>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="p-6 pt-4 space-y-4">
        {/* Visualization Button */}
        {!visualizationActive && (
          <button
            onClick={handleStartVisualization}
            className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <Play size={20} />
            Start Visualization
          </button>
        )}

        {/* Time Series Controls */}
        {visualizationActive && hasTimeSeries && (
          <div className="bg-gray-900 rounded-lg p-4 space-y-3">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center gap-2"
              >
                {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                {isPlaying ? 'Pause' : 'Play'}
              </button>

              <div className="flex-1">
                <input
                  type="range"
                  min="0"
                  max={heatmapPayload.time_series.length - 1}
                  value={currentFrame}
                  onChange={(e) => {
                    setCurrentFrame(parseInt(e.target.value));
                    setIsPlaying(false);
                  }}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>

              <span className="text-sm text-gray-300 whitespace-nowrap">
                Frame {currentFrame + 1} / {heatmapPayload.time_series.length}
              </span>
            </div>

            {/* Legend */}
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <span>Legend:</span>
              <div className="flex items-center gap-1">
                <div className="w-4 h-4 bg-red-600 rounded"></div>
                <span>Low</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                <span>Medium</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-4 h-4 bg-green-600 rounded"></div>
                <span>High</span>
              </div>
            </div>
          </div>
        )}

        {/* Static data indicator */}
        {visualizationActive && !hasTimeSeries && (
          <div className="bg-gray-900 rounded-lg p-4">
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <span>Legend:</span>
              <div className="flex items-center gap-1">
                <div className="w-4 h-4 bg-red-600 rounded"></div>
                <span>Low</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                <span>Medium</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-4 h-4 bg-green-600 rounded"></div>
                <span>High</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default IndiaMap;