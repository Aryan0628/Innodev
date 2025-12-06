// Utility functions for map data processing

// State name to ISO code mapping
const STATE_NAME_TO_ISO = {
  "Uttar Pradesh": "IN-UP",
  "Maharashtra": "IN-MH",
  "Delhi": "IN-DL",
  "Karnataka": "IN-KA",
  "Tamil Nadu": "IN-TN",
  "Gujarat": "IN-GJ",
  "Rajasthan": "IN-RJ",
  "West Bengal": "IN-WB",
  "Andhra Pradesh": "IN-AP",
  "Telangana": "IN-TG",
  "Madhya Pradesh": "IN-MP",
  "Kerala": "IN-KL",
  "Odisha": "IN-OR",
  "Punjab": "IN-PB",
  "Haryana": "IN-HR",
  "Chhattisgarh": "IN-CT",
  "Jharkhand": "IN-JH",
  "Assam": "IN-AS",
  "Uttarakhand": "IN-UT",
  "Himachal Pradesh": "IN-HP",
  "Bihar": "IN-BR",
  "Goa": "IN-GA",
  "Manipur": "IN-MN",
  "Meghalaya": "IN-ML",
  "Mizoram": "IN-MZ",
  "Nagaland": "IN-NL",
  "Sikkim": "IN-SK",
  "Tripura": "IN-TR",
  "Arunachal Pradesh": "IN-AR",
  "Jammu & Kashmir": "IN-JK",
  "Ladakh": "IN-LA",
  "Chandigarh": "IN-CH",
  "Dadra & Nagar Haveli": "IN-DN",
  "Daman & Diu": "IN-DD",
  "Lakshadweep": "IN-LD",
  "Puducherry": "IN-PY",
  "Andaman & Nicobar": "IN-AN",
};

/**
 * Get ISO code from state name
 */
export const getISOFromStateName = (stateName) => {
  return STATE_NAME_TO_ISO[stateName] || null;
};

/**
 * Color interpolation from red (0) to green (1)
 * @param {number} value - Value between 0 and 1
 * @returns {string} - RGB color string
 */
export const getColorForValue = (value) => {
  if (value === null || value === undefined) {
    return '#e5e7eb'; // Gray for no data
  }

  // Normalize value to 0-1 range if needed
  const normalizedValue = Math.max(0, Math.min(1, value / 500)); // Assuming max value ~500 from mock data
  
  // Red to Yellow to Green gradient
  if (normalizedValue < 0.5) {
    // Red to Yellow
    const t = normalizedValue * 2; // 0 to 1
    const r = 255;
    const g = Math.round(255 * t);
    const b = 0;
    return `rgb(${r}, ${g}, ${b})`;
  } else {
    // Yellow to Green
    const t = (normalizedValue - 0.5) * 2; // 0 to 1
    const r = Math.round(255 * (1 - t));
    const g = 255;
    const b = 0;
    return `rgb(${r}, ${g}, ${b})`;
  }
};

/**
 * Process and enrich GeoJSON with heatmap data
 * @param {Object} geojson - Raw GeoJSON data
 * @param {Array} data - Heatmap data with region_id and value
 * @param {boolean} applyValues - Whether to apply values or use neutral colors
 * @returns {Object} - Enriched GeoJSON
 */
export const processMapData = (geojson, data, applyValues = false) => {
  if (!geojson || !data) {
    return geojson;
  }

  // Create a map from region_id to value
  const dataMap = new Map();
  data.forEach(item => {
    if (item.region_id && item.value !== undefined) {
      dataMap.set(item.region_id, item.value);
    }
  });

  // Clone and enrich the GeoJSON
  const enriched = {
    ...geojson,
    features: geojson.features.map(feature => {
      const properties = feature.properties;
      
      // Try to get ISO code from properties or derive it
      let isoCode = properties.ISO_3166_2 || 
                    properties.iso_3166_2 ||
                    properties.region_id;
      
      // If no ISO code, try to derive from state name
      if (!isoCode) {
        const stateName = properties.ST_NM || properties.name || properties.NAME;
        if (stateName) {
          isoCode = getISOFromStateName(stateName);
        }
      }

      // Get value from data map
      const value = isoCode && applyValues ? dataMap.get(isoCode) : null;

      return {
        ...feature,
        properties: {
          ...properties,
          ISO_3166_2: isoCode,
          heatmap_value: value,
        },
      };
    }),
  };

  return enriched;
};

/**
 * Function to prepare data for backend integration
 * Structure: { stateIsoCode: value, ... }
 * This makes it easy to swap with real API responses later
 */
export const mapBackendDataToMapValues = (backendResponse) => {
  // Example backend response format:
  // { data: [{ region_id: "IN-UP", value: 450 }, ...] }
  
  if (!backendResponse || !backendResponse.data) {
    return [];
  }

  return backendResponse.data.map(item => ({
    region_id: item.region_id,
    region_name: item.region_name,
    value: item.value,
  }));
};

/**
 * Validate data coverage
 * Returns info about missing regions
 */
export const validateDataCoverage = (geojson, data) => {
  const geoRegions = new Set();
  geojson.features.forEach(feature => {
    const iso = feature.properties.ISO_3166_2 || 
                getISOFromStateName(feature.properties.ST_NM || feature.properties.name);
    if (iso) geoRegions.add(iso);
  });

  const dataRegions = new Set(data.map(d => d.region_id));
  
  const missingInData = [...geoRegions].filter(r => !dataRegions.has(r));
  const missingInGeo = [...dataRegions].filter(r => !geoRegions.has(r));
  
  return {
    geoRegionCount: geoRegions.size,
    dataRegionCount: dataRegions.size,
    missingInData,
    missingInGeo,
    coverage: ((dataRegions.size / geoRegions.size) * 100).toFixed(1) + '%',
  };
};