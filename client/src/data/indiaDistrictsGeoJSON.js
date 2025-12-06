// src/data/indiaDistrictsGeoJSON.js
// Simplified district-level GeoJSON for demonstration
// For production, download complete data from https://github.com/datameet/maps

export const INDIA_DISTRICTS_GEOJSON = {
  "type": "FeatureCollection",
  "features": [
    // Uttar Pradesh Districts
    {
      "type": "Feature",
      "properties": {
        "name": "Lucknow",
        "state": "Uttar Pradesh",
        "ISO_3166_2": "IN-UP",
        "district_id": "UP-LKO"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[80.5, 26.5], [81.5, 26.5], [81.5, 27.5], [80.5, 27.5], [80.5, 26.5]]]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "name": "Kanpur",
        "state": "Uttar Pradesh",
        "ISO_3166_2": "IN-UP",
        "district_id": "UP-KNP"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[79.5, 26], [80.5, 26], [80.5, 27], [79.5, 27], [79.5, 26]]]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "name": "Varanasi",
        "state": "Uttar Pradesh",
        "ISO_3166_2": "IN-UP",
        "district_id": "UP-VNS"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[82.5, 25], [83.5, 25], [83.5, 26], [82.5, 26], [82.5, 25]]]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "name": "Agra",
        "state": "Uttar Pradesh",
        "ISO_3166_2": "IN-UP",
        "district_id": "UP-AGR"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[77.5, 27], [78.5, 27], [78.5, 28], [77.5, 28], [77.5, 27]]]
      }
    },
    // Maharashtra Districts
    {
      "type": "Feature",
      "properties": {
        "name": "Mumbai",
        "state": "Maharashtra",
        "ISO_3166_2": "IN-MH",
        "district_id": "MH-MUM"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[72.7, 18.8], [73.2, 18.8], [73.2, 19.3], [72.7, 19.3], [72.7, 18.8]]]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "name": "Pune",
        "state": "Maharashtra",
        "ISO_3166_2": "IN-MH",
        "district_id": "MH-PUN"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[73.5, 18], [74.5, 18], [74.5, 19], [73.5, 19], [73.5, 18]]]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "name": "Nagpur",
        "state": "Maharashtra",
        "ISO_3166_2": "IN-MH",
        "district_id": "MH-NAG"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[78.5, 20.5], [79.5, 20.5], [79.5, 21.5], [78.5, 21.5], [78.5, 20.5]]]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "name": "Nashik",
        "state": "Maharashtra",
        "ISO_3166_2": "IN-MH",
        "district_id": "MH-NSH"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[73, 19.5], [74, 19.5], [74, 20.5], [73, 20.5], [73, 19.5]]]
      }
    },
    // Delhi Districts
    {
      "type": "Feature",
      "properties": {
        "name": "North Delhi",
        "state": "Delhi",
        "ISO_3166_2": "IN-DL",
        "district_id": "DL-ND"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[77, 28.6], [77.3, 28.6], [77.3, 28.8], [77, 28.8], [77, 28.6]]]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "name": "South Delhi",
        "state": "Delhi",
        "ISO_3166_2": "IN-DL",
        "district_id": "DL-SD"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[77, 28.4], [77.3, 28.4], [77.3, 28.6], [77, 28.6], [77, 28.4]]]
      }
    },
    // Karnataka Districts
    {
      "type": "Feature",
      "properties": {
        "name": "Bangalore Urban",
        "state": "Karnataka",
        "ISO_3166_2": "IN-KA",
        "district_id": "KA-BLR"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[77.3, 12.7], [77.8, 12.7], [77.8, 13.2], [77.3, 13.2], [77.3, 12.7]]]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "name": "Mysore",
        "state": "Karnataka",
        "ISO_3166_2": "IN-KA",
        "district_id": "KA-MYS"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[76, 12], [77, 12], [77, 13], [76, 13], [76, 12]]]
      }
    },
    // Tamil Nadu Districts
    {
      "type": "Feature",
      "properties": {
        "name": "Chennai",
        "state": "Tamil Nadu",
        "ISO_3166_2": "IN-TN",
        "district_id": "TN-CHN"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[80, 12.8], [80.5, 12.8], [80.5, 13.3], [80, 13.3], [80, 12.8]]]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "name": "Coimbatore",
        "state": "Tamil Nadu",
        "ISO_3166_2": "IN-TN",
        "district_id": "TN-COI"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[76.5, 10.5], [77.5, 10.5], [77.5, 11.5], [76.5, 11.5], [76.5, 10.5]]]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "name": "Madurai",
        "state": "Tamil Nadu",
        "ISO_3166_2": "IN-TN",
        "district_id": "TN-MDU"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[77.5, 9.5], [78.5, 9.5], [78.5, 10.5], [77.5, 10.5], [77.5, 9.5]]]
      }
    },
    // Gujarat Districts
    {
      "type": "Feature",
      "properties": {
        "name": "Ahmedabad",
        "state": "Gujarat",
        "ISO_3166_2": "IN-GJ",
        "district_id": "GJ-AHM"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[72, 22.5], [73, 22.5], [73, 23.5], [72, 23.5], [72, 22.5]]]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "name": "Surat",
        "state": "Gujarat",
        "ISO_3166_2": "IN-GJ",
        "district_id": "GJ-SRT"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[72.5, 21], [73.5, 21], [73.5, 22], [72.5, 22], [72.5, 21]]]
      }
    },
    // West Bengal Districts
    {
      "type": "Feature",
      "properties": {
        "name": "Kolkata",
        "state": "West Bengal",
        "ISO_3166_2": "IN-WB",
        "district_id": "WB-KOL"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[88.2, 22.4], [88.6, 22.4], [88.6, 22.8], [88.2, 22.8], [88.2, 22.4]]]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "name": "Darjeeling",
        "state": "West Bengal",
        "ISO_3166_2": "IN-WB",
        "district_id": "WB-DAR"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[88, 26.5], [89, 26.5], [89, 27.5], [88, 27.5], [88, 26.5]]]
      }
    },
    // Rajasthan Districts
    {
      "type": "Feature",
      "properties": {
        "name": "Jaipur",
        "state": "Rajasthan",
        "ISO_3166_2": "IN-RJ",
        "district_id": "RJ-JPR"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[75, 26.5], [76, 26.5], [76, 27.5], [75, 27.5], [75, 26.5]]]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "name": "Jodhpur",
        "state": "Rajasthan",
        "ISO_3166_2": "IN-RJ",
        "district_id": "RJ-JDH"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[72.5, 26], [73.5, 26], [73.5, 27], [72.5, 27], [72.5, 26]]]
      }
    }
  ]
};

export default INDIA_DISTRICTS_GEOJSON;