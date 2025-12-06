// src/data/indiaStatesGeoJSON.js
// 
// NOTE: This is simplified GeoJSON data for development.
// For production, use real India administrative boundaries from:
// 1. https://github.com/datameet/maps (Free, India-specific)
// 2. https://data.gov.in/ (Official Government of India portal)
// 3. Natural Earth Data: https://www.naturalearthdata.com/
//
// Download the full GeoJSON and replace this file.

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
          [77.0, 27.0], [82.5, 26.0], [84.0, 27.5], [83.5, 29.5], 
          [82.0, 30.5], [77.5, 30.3], [76.8, 28.5], [77.0, 27.0]
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
          [72.5, 15.5], [77.5, 15.5], [80.5, 18.0], [80.0, 21.5], 
          [77.0, 22.0], [73.0, 21.5], [72.5, 19.0], [72.5, 15.5]
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
          [74.0, 11.5], [78.5, 11.5], [78.5, 15.0], [77.5, 18.5], 
          [75.0, 18.0], [74.0, 15.5], [74.0, 11.5]
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
          [76.2, 8.0], [80.3, 8.0], [80.3, 13.5], [78.0, 13.5], 
          [77.0, 11.5], [76.2, 10.0], [76.2, 8.0]
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
          [68.0, 20.0], [74.5, 20.5], [74.5, 24.7], [72.0, 24.7], 
          [68.5, 23.5], [68.0, 20.0]
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
          [69.0, 23.5], [78.5, 24.0], [78.0, 30.5], [73.0, 30.5], 
          [70.0, 28.0], [69.0, 25.0], [69.0, 23.5]
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
          [85.5, 21.5], [89.5, 21.5], [89.5, 27.5], [88.0, 27.5], 
          [87.0, 25.5], [85.5, 24.0], [85.5, 21.5]
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
          [76.8, 13.0], [84.8, 13.0], [84.8, 19.0], [82.0, 19.5], 
          [78.5, 18.0], [77.0, 15.0], [76.8, 13.0]
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
          [77.0, 15.8], [81.5, 16.0], [81.0, 19.5], [78.2, 19.5], 
          [77.0, 18.0], [77.0, 15.8]
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
          [74.0, 21.0], [82.5, 21.5], [82.5, 26.5], [77.0, 27.0], 
          [74.5, 25.0], [74.0, 21.0]
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
          [74.8, 8.3], [77.5, 8.3], [77.5, 12.8], [75.0, 12.8], 
          [74.8, 10.5], [74.8, 8.3]
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
          [81.0, 17.8], [87.5, 17.8], [87.5, 22.6], [84.5, 22.6], 
          [82.0, 20.5], [81.0, 17.8]
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
          [73.9, 29.5], [76.9, 29.5], [76.9, 32.5], [74.5, 32.5], [73.9, 29.5]
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
          [74.5, 27.6], [77.8, 27.6], [77.8, 30.9], [75.5, 30.9], [74.5, 27.6]
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
          [80.0, 17.8], [84.5, 17.8], [84.5, 24.1], [80.5, 24.1], [80.0, 17.8]
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
          [83.3, 21.9], [87.9, 21.9], [87.9, 25.3], [84.6, 25.3], [83.3, 21.9]
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
          [89.7, 24.1], [96.0, 24.1], [96.0, 28.2], [90.5, 28.2], [89.7, 24.1]
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
          [77.5, 28.7], [81.0, 28.7], [81.0, 31.5], [77.5, 31.5], [77.5, 28.7]
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
          [75.5, 30.4], [79.0, 30.4], [79.0, 33.2], [75.5, 33.2], [75.5, 30.4]
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
          [83.3, 24.3], [88.3, 24.3], [88.3, 27.5], [84.0, 27.5], [83.3, 24.3]
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
          [73.7, 14.9], [74.7, 14.9], [74.7, 15.8], [73.7, 15.8], [73.7, 14.9]
        ]]
      }
    }
  ]
};

export default INDIA_STATES_GEOJSON;