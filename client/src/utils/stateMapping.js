// Mapping from state names (as they appear in GeoJSON) to ISO 3166-2 codes
export const stateNameToISO = {
  "Andaman & Nicobar Island": "IN-AN",
  "Andhra Pradesh": "IN-AP",
  "Arunanchal Pradesh": "IN-AR",
  "Assam": "IN-AS",
  "Bihar": "IN-BR",
  "Chandigarh": "IN-CH",
  "Chhattisgarh": "IN-CT",
  "Dadara & Nagar Havelli": "IN-DH",
  "Daman & Diu": "IN-DD",
  "Delhi": "IN-DL",
  "Goa": "IN-GA",
  "Gujarat": "IN-GJ",
  "Haryana": "IN-HR",
  "Himachal Pradesh": "IN-HP",
  "Jammu & Kashmir": "IN-JK",
  "Jharkhand": "IN-JH",
  "Karnataka": "IN-KA",
  "Kerala": "IN-KL",
  "Lakshadweep": "IN-LD",
  "Madhya Pradesh": "IN-MP",
  "Maharashtra": "IN-MH",
  "Manipur": "IN-MN",
  "Meghalaya": "IN-ML",
  "Mizoram": "IN-MZ",
  "Nagaland": "IN-NL",
  "Odisha": "IN-OR",
  "Puducherry": "IN-PY",
  "Punjab": "IN-PB",
  "Rajasthan": "IN-RJ",
  "Sikkim": "IN-SK",
  "Tamil Nadu": "IN-TN",
  "Telangana": "IN-TG",
  "Tripura": "IN-TR",
  "Uttar Pradesh": "IN-UP",
  "Uttarakhand": "IN-UT",
  "West Bengal": "IN-WB",
};

// Reverse mapping: ISO code to state name
export const isoToStateName = Object.fromEntries(
  Object.entries(stateNameToISO).map(([name, iso]) => [iso, name])
);

// Get ISO code from state name
export const getISOFromStateName = (stateName) => {
  return stateNameToISO[stateName] || null;
};

// Get state name from ISO code
export const getStateNameFromISO = (isoCode) => {
  return isoToStateName[isoCode] || null;
};

