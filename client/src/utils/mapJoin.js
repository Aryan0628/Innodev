import { getISOFromStateName } from "./stateMapping.js";

export const mapJoinUtil = {
  join: (geojson, data, regionIdField = "ISO_3166_2") => {
    // Create a map from region_id (ISO code) to value
    const dataMap = new Map(data.map((d) => [d.region_id, d.value]));

    return {
      ...geojson,
      features: geojson.features.map((feature) => {
        // Try to get ISO code from properties
        let id = feature.properties[regionIdField];
        
        // If ISO code not found, try to get it from state name
        if (!id && feature.properties.ST_NM) {
          id = getISOFromStateName(feature.properties.ST_NM);
        }
        
        // If still no ID, try other common property names
        if (!id && feature.properties.name) {
          id = getISOFromStateName(feature.properties.name);
        }

        const value = id ? dataMap.get(id) : undefined;
        
        return {
          ...feature,
          properties: {
            ...feature.properties,
            heatmap_value: value !== undefined ? value : null,
            ISO_3166_2: id || feature.properties.ISO_3166_2 || null,
          },
        };
      }),
    };
  },

  validate: (geojson, data) => {
    const geoIds = new Set(
      geojson.features.map((f) => {
        return f.properties.ISO_3166_2 || getISOFromStateName(f.properties.ST_NM || f.properties.name);
      }).filter(Boolean)
    );
    const dataIds = new Set(data.map((d) => d.region_id));

    const missing = [...dataIds].filter((id) => !geoIds.has(id));
    const coverage = ((dataIds.size - missing.length) / dataIds.size) * 100;

    return { missing, coverage: coverage.toFixed(1) };
  },
};
