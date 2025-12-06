// src/data/mockHeatmapData.js
// Mock heatmap data for India states with time series animation

// Generate realistic time series data
function generateTimeSeries(numFrames = 10) {
  const frames = [];
  const baseDate = new Date('2024-01-01');
  
  // All Indian states with ISO codes
  const states = [
    { region_id: "IN-UP", region_name: "Uttar Pradesh", baseValue: 450 },
    { region_id: "IN-MH", region_name: "Maharashtra", baseValue: 420 },
    { region_id: "IN-DL", region_name: "Delhi", baseValue: 500 },
    { region_id: "IN-KA", region_name: "Karnataka", baseValue: 380 },
    { region_id: "IN-TN", region_name: "Tamil Nadu", baseValue: 390 },
    { region_id: "IN-GJ", region_name: "Gujarat", baseValue: 350 },
    { region_id: "IN-RJ", region_name: "Rajasthan", baseValue: 320 },
    { region_id: "IN-WB", region_name: "West Bengal", baseValue: 400 },
    { region_id: "IN-AP", region_name: "Andhra Pradesh", baseValue: 340 },
    { region_id: "IN-TG", region_name: "Telangana", baseValue: 360 },
    { region_id: "IN-MP", region_name: "Madhya Pradesh", baseValue: 280 },
    { region_id: "IN-KL", region_name: "Kerala", baseValue: 370 },
    { region_id: "IN-OR", region_name: "Odisha", baseValue: 300 },
    { region_id: "IN-PB", region_name: "Punjab", baseValue: 330 },
    { region_id: "IN-HR", region_name: "Haryana", baseValue: 340 },
    { region_id: "IN-CT", region_name: "Chhattisgarh", baseValue: 250 },
    { region_id: "IN-JH", region_name: "Jharkhand", baseValue: 270 },
    { region_id: "IN-AS", region_name: "Assam", baseValue: 290 },
    { region_id: "IN-UT", region_name: "Uttarakhand", baseValue: 260 },
    { region_id: "IN-HP", region_name: "Himachal Pradesh", baseValue: 240 },
    { region_id: "IN-BR", region_name: "Bihar", baseValue: 310 },
    { region_id: "IN-GA", region_name: "Goa", baseValue: 200 },
    { region_id: "IN-MN", region_name: "Manipur", baseValue: 180 },
    { region_id: "IN-ML", region_name: "Meghalaya", baseValue: 170 },
    { region_id: "IN-MZ", region_name: "Mizoram", baseValue: 150 },
    { region_id: "IN-NL", region_name: "Nagaland", baseValue: 160 },
    { region_id: "IN-SK", region_name: "Sikkim", baseValue: 140 },
    { region_id: "IN-TR", region_name: "Tripura", baseValue: 190 },
    { region_id: "IN-AR", region_name: "Arunachal Pradesh", baseValue: 130 },
    { region_id: "IN-JK", region_name: "Jammu & Kashmir", baseValue: 220 },
  ];

  for (let i = 0; i < numFrames; i++) {
    const frameDate = new Date(baseDate);
    frameDate.setDate(frameDate.getDate() + i * 3); // 3 days apart
    
    frames.push({
      timestamp: frameDate.toISOString(),
      label: `Day ${i + 1}`,
      data: states.map(state => {
        // Create variation over time - some states increase, some decrease
        const trend = Math.sin(i / numFrames * Math.PI * 2) * 100;
        const randomVariation = (Math.random() - 0.5) * 50;
        const value = Math.max(50, state.baseValue + trend + randomVariation);
        
        return {
          region_id: state.region_id,
          region_name: state.region_name,
          value: Math.round(value * 10) / 10, // Round to 1 decimal
        };
      }),
    });
  }

  return frames;
}

// Generate base data (first frame)
const timeSeries = generateTimeSeries(10);
const baseData = timeSeries[0].data;

export const MOCK_HEATMAP_PAYLOAD = {
  meta: {
    version: "1.0.0",
    template: "states",
    timestamp: new Date().toISOString(),
    title: "Mock India Heatmap Data",
    description: "Sample data for development and testing",
    units: "cases_per_100k",
    value_field: "value",
    scale_mode: "quantile",
    color_palette: "YlOrRd",
  },
  data: baseData,
  time_series: timeSeries,
};

export default MOCK_HEATMAP_PAYLOAD;