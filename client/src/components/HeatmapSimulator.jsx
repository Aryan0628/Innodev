import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";
import { mapJoinUtil } from "../utils/mapJoin";
import { scalesUtil } from "../utils/scales";
import { animationUtil } from "../utils/animation";
import { exporterUtil } from "../utils/exporter";


const HeatmapSimulator = ({ payload, geojson }) => {
  const svgRef = useRef(null);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const animationControllerRef = useRef(null);

  useEffect(() => {
    if (!payload || !geojson || !svgRef.current) return;

    // Clear previous content
    d3.select(svgRef.current).selectAll("*").remove();

    // Set up SVG
    const svg = d3.select(svgRef.current);
    const width = 900;
    const height = 700;

    svg
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("width", "100%")
      .attr("height", "100%")
      .style("max-height", "700px");

    const g = svg.append("g");

    // Create projection for India map with padding
    const projection = d3.geoMercator().fitExtent(
      [
        [50, 50],
        [width - 50, height - 50],
      ],
      geojson
    );

    const path = d3.geoPath().projection(projection);

    // Get current frame data
    const currentData =
      payload.time_series?.[currentFrame]?.data || payload.data;

    // Join data with geojson
    const enrichedGeojson = mapJoinUtil.join(geojson, currentData);

    // Create color scale
    const colorScale = scalesUtil.create(
      currentData,
      payload.meta?.scale_mode || "quantile",
      payload.meta?.color_palette || "YlOrRd"
    );

    // Draw map
    g.selectAll("path")
      .data(enrichedGeojson.features)
      .join("path")
      .attr("d", path)
      .attr("fill", (d) => {
        const value = d.properties.heatmap_value;
        return value !== null && value !== undefined
          ? colorScale(value)
          : "#e0e0e0";
      })
      .attr("stroke", "#fff")
      .attr("stroke-width", 0.5)
      .on("mouseover", function (event, d) {
        d3.select(this).attr("stroke-width", 2);
        // Show tooltip (you can enhance this)
        const value = d.properties.heatmap_value;
        const name = d.properties.ST_NM || d.properties.name || "Unknown";
        console.log(
          `${name}: ${value !== null ? value.toFixed(2) : "No data"}`
        );
      })
      .on("mouseout", function () {
        d3.select(this).attr("stroke-width", 0.5);
      });

    // Add zoom functionality
    const zoom = d3
      .zoom()
      .scaleExtent([1, 8])
      .on("zoom", (event) => {
        g.attr("transform", event.transform);
      });

    svg.call(zoom);
  }, [payload, geojson, currentFrame]);

  // Animation controls
  useEffect(() => {
    if (!payload?.time_series) return;

    if (animationControllerRef.current) {
      animationControllerRef.current.pause();
    }

    const controller = animationUtil.createController(
      payload.time_series,
      setCurrentFrame,
      30
    );

    animationControllerRef.current = controller;

    if (isPlaying) {
      controller.play();
    }

    return () => {
      if (animationControllerRef.current) {
        animationControllerRef.current.pause();
      }
    };
  }, [payload, isPlaying]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleExportSVG = () => {
    if (svgRef.current) {
      exporterUtil.downloadSVG(svgRef.current, "india-heatmap.svg");
    }
  };

  const handleExportPNG = () => {
    if (svgRef.current) {
      exporterUtil.downloadPNG(svgRef.current, "india-heatmap.png");
    }
  };

  return (
    <div className="flex flex-col items-center justify-start w-full min-h-screen p-6 bg-black">
      <div className="w-full max-w-6xl">
        <h2 className="text-2xl font-bold text-white mb-4 text-center">
          India Heatmap Visualization
        </h2>

        {/* SVG Container - Centered */}
        <div className="bg-white rounded-lg p-4 mb-4 flex items-center justify-center">
          <svg ref={svgRef} className="w-full h-auto max-w-4xl"></svg>
        </div>

        {/* Controls */}
        {payload?.time_series && payload.time_series.length > 0 && (
          <div className="flex flex-col gap-4 p-4 bg-gray-900 rounded-lg">
            <div className="flex items-center gap-4">
              <button
                onClick={togglePlayPause}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                {isPlaying ? "Pause" : "Play"}
              </button>

              <input
                type="range"
                min="0"
                max={payload.time_series.length - 1}
                value={currentFrame}
                onChange={(e) => {
                  setCurrentFrame(parseInt(e.target.value));
                  setIsPlaying(false);
                }}
                className="flex-1"
              />

              <span className="text-white text-sm">
                Frame: {currentFrame + 1} / {payload.time_series.length}
              </span>
            </div>

            {/* Export buttons */}
            <div className="flex gap-2">
              <button
                onClick={handleExportSVG}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors text-sm"
              >
                Export SVG
              </button>
              <button
                onClick={handleExportPNG}
                className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors text-sm"
              >
                Export PNG
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeatmapSimulator;
