import { useEffect, useState } from "react";
import { MapContainer, TileLayer, GeoJSON, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function FitWorld() {
  const map = useMap();
  useEffect(() => {
    map.setView([20, 0], 2);
    map.invalidateSize();
  }, [map]);
  return null;
}

function WorldMapSimulation() {
  const [geoJsonData, setGeoJsonData] = useState(null);

  useEffect(() => {
    fetch("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson")
      .then((res) => res.json())
      .then((data) => setGeoJsonData(data))
      .catch((err) => console.error("Map Error:", err));
  }, []);

  const geoJsonStyle = {
    fillColor: "#000000",
    weight: 0.5,
    opacity: 1,
    color: "#ffffff",
    fillOpacity: 0.8,
  };

  return (
    <div className="absolute inset-0 -z-10 w-full h-full bg-black pointer-events-none">
      <MapContainer
        center={[20, 0]}
        zoom={2}
        zoomControl={false}
        scrollWheelZoom={false}
        doubleClickZoom={false}
        dragging={false}
        style={{ height: "100%", width: "100%", background: "#000000" }}
        attributionControl={false}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png"
          opacity={0.5}
        />
        {geoJsonData && <GeoJSON data={geoJsonData} style={geoJsonStyle} />}
        <FitWorld />
      </MapContainer>

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]" />
    </div>
  );
}

export default WorldMapSimulation;
