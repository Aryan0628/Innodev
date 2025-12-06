// src/data/indiaStatesGeoJSON.js
// Simplified GeoJSON for Indian states (mock data for development)
// Real coordinates are simplified for demonstration

export const INDIA_STATES_GEOJSON = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {
        ST_NM: "Uttar Pradesh",
        ISO_3166_2: "IN-UP",
        name: "Uttar Pradesh"
      },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [77.5, 27.5], [82.5, 27.5], [82.5, 30.5], [77.5, 30.5], [77.5, 27.5]
        ]]
      }
    },
    {
      type: "Feature",
      properties: {
        ST_NM: "Maharashtra",
        ISO_3166_2: "IN-MH",
        name: "Maharashtra"
      },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [72.5, 16], [77.5, 16], [77.5, 21], [72.5, 21], [72.5, 16]
        ]]
      }
    },
    {
      type: "Feature",
      properties: {
        ST_NM: "Delhi",
        ISO_3166_2: "IN-DL",
        name: "Delhi"
      },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [76.8, 28.4], [77.5, 28.4], [77.5, 28.9], [76.8, 28.9], [76.8, 28.4]
        ]]
      }
    },
    {
      type: "Feature",
      properties: {
        ST_NM: "Karnataka",
        ISO_3166_2: "IN-KA",
        name: "Karnataka"
      },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [74, 12], [78, 12], [78, 18], [74, 18], [74, 12]
        ]]
      }
    },
    {
      type: "Feature",
      properties: {
        ST_NM: "Tamil Nadu",
        ISO_3166_2: "IN-TN",
        name: "Tamil Nadu"
      },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [76.5, 8], [80, 8], [80, 13], [76.5, 13], [76.5, 8]
        ]]
      }
    },
    {
      type: "Feature",
      properties: {
        ST_NM: "Gujarat",
        ISO_3166_2: "IN-GJ",
        name: "Gujarat"
      },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [68.5, 20.5], [74, 20.5], [74, 24.5], [68.5, 24.5], [68.5, 20.5]
        ]]
      }
    },
    {
      type: "Feature",
      properties: {
        ST_NM: "Rajasthan",
        ISO_3166_2: "IN-RJ",
        name: "Rajasthan"
      },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [69.5, 24], [78, 24], [78, 30], [69.5, 30], [69.5, 24]
        ]]
      }
    },
    {
      type: "Feature",
      properties: {
        ST_NM: "West Bengal",
        ISO_3166_2: "IN-WB",
        name: "West Bengal"
      },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [85.5, 21.5], [89.5, 21.5], [89.5, 27.5], [85.5, 27.5], [85.5, 21.5]
        ]]
      }
    },
    {
      type: "Feature",
      properties: {
        ST_NM: "Andhra Pradesh",
        ISO_3166_2: "IN-AP",
        name: "Andhra Pradesh"
      },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [77, 13], [84.5, 13], [84.5, 19.5], [77, 19.5], [77, 13]
        ]]
      }
    },
    {
      type: "Feature",
      properties: {
        ST_NM: "Telangana",
        ISO_3166_2: "IN-TG",
        name: "Telangana"
      },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [77, 16], [81, 16], [81, 19.5], [77, 19.5], [77, 16]
        ]]
      }
    },
    {
      type: "Feature",
      properties: {
        ST_NM: "Madhya Pradesh",
        ISO_3166_2: "IN-MP",
        name: "Madhya Pradesh"
      },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [74, 21.5], [82, 21.5], [82, 26.5], [74, 26.5], [74, 21.5]
        ]]
      }
    },
    {
      type: "Feature",
      properties: {
        ST_NM: "Kerala",
        ISO_3166_2: "IN-KL",
        name: "Kerala"
      },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [74.5, 8.5], [77.5, 8.5], [77.5, 12.5], [74.5, 12.5], [74.5, 8.5]
        ]]
      }
    },
    {
      type: "Feature",
      properties: {
        ST_NM: "Odisha",
        ISO_3166_2: "IN-OR",
        name: "Odisha"
      },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [81.5, 17.5], [87, 17.5], [87, 22.5], [81.5, 22.5], [81.5, 17.5]
        ]]
      }
    },
    {
      type: "Feature",
      properties: {
        ST_NM: "Punjab",
        ISO_3166_2: "IN-PB",
        name: "Punjab"
      },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [74, 29.5], [76.5, 29.5], [76.5, 32], [74, 32], [74, 29.5]
        ]]
      }
    },
    {
      type: "Feature",
      properties: {
        ST_NM: "Haryana",
        ISO_3166_2: "IN-HR",
        name: "Haryana"
      },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [74.5, 27.5], [77.5, 27.5], [77.5, 30.5], [74.5, 30.5], [74.5, 27.5]
        ]]
      }
    },
    {
      type: "Feature",
      properties: {
        ST_NM: "Chhattisgarh",
        ISO_3166_2: "IN-CT",
        name: "Chhattisgarh"
      },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [80, 17.5], [84, 17.5], [84, 24], [80, 24], [80, 17.5]
        ]]
      }
    },
    {
      type: "Feature",
      properties: {
        ST_NM: "Jharkhand",
        ISO_3166_2: "IN-JH",
        name: "Jharkhand"
      },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [83.5, 22], [87, 22], [87, 25], [83.5, 25], [83.5, 22]
        ]]
      }
    },
    {
      type: "Feature",
      properties: {
        ST_NM: "Assam",
        ISO_3166_2: "IN-AS",
        name: "Assam"
      },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [89.5, 24.5], [96, 24.5], [96, 28], [89.5, 28], [89.5, 24.5]
        ]]
      }
    },
    {
      type: "Feature",
      properties: {
        ST_NM: "Uttarakhand",
        ISO_3166_2: "IN-UT",
        name: "Uttarakhand"
      },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [77.5, 29], [81, 29], [81, 31.5], [77.5, 31.5], [77.5, 29]
        ]]
      }
    },
    {
      type: "Feature",
      properties: {
        ST_NM: "Himachal Pradesh",
        ISO_3166_2: "IN-HP",
        name: "Himachal Pradesh"
      },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [75.5, 30.5], [79, 30.5], [79, 33], [75.5, 33], [75.5, 30.5]
        ]]
      }
    },
    {
      type: "Feature",
      properties: {
        ST_NM: "Bihar",
        ISO_3166_2: "IN-BR",
        name: "Bihar"
      },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [83.5, 24.5], [88, 24.5], [88, 27.5], [83.5, 27.5], [83.5, 24.5]
        ]]
      }
    },
    {
      type: "Feature",
      properties: {
        ST_NM: "Goa",
        ISO_3166_2: "IN-GA",
        name: "Goa"
      },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [73.5, 14.8], [74.5, 14.8], [74.5, 15.8], [73.5, 15.8], [73.5, 14.8]
        ]]
      }
    }
  ]
};

export default INDIA_STATES_GEOJSON;