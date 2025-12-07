// Mock data service for dashboard functionality
// This will be replaced with real API calls when backend is integrated

export const mockUser = {
  name: "John Doe",
  email: "john.doe@example.com",
  picture: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
  sub: "auth0|123456789",
};

export const mockReports = [
  {
    id: 1,
    name: "Healthcare Policy Impact Analysis",
    date: "Dec 5, 2025",
    status: "completed",
    pages: 24,
    content: {
      summary: "Comprehensive analysis of healthcare policy impact across 28 states",
      support: 67.4,
      opposition: 24.8,
      neutral: 7.8,
      keyFindings: [
        "High support in urban areas (78%)",
        "Moderate support in rural regions (52%)",
        "Strong demographic correlation with income levels",
      ],
    },
  },
  {
    id: 2,
    name: "Education Reform Simulation Results",
    date: "Dec 3, 2025",
    status: "completed",
    pages: 18,
    content: {
      summary: "Education policy reform simulation with demographic breakdown",
      support: 72.1,
      opposition: 18.3,
      neutral: 9.6,
      keyFindings: [
        "Universal support across age groups",
        "Higher education levels correlate with support",
        "Regional variations in implementation readiness",
      ],
    },
  },
  {
    id: 3,
    name: "Tax Policy Public Sentiment Report",
    date: "Dec 1, 2025",
    status: "completed",
    pages: 32,
    content: {
      summary: "Detailed tax policy sentiment analysis",
      support: 45.2,
      opposition: 42.1,
      neutral: 12.7,
      keyFindings: [
        "Polarized opinions across income brackets",
        "Urban support higher than rural",
        "Age-based sentiment variations",
      ],
    },
  },
  {
    id: 4,
    name: "Infrastructure Development Analysis",
    date: "Nov 28, 2025",
    status: "completed",
    pages: 21,
    content: {
      summary: "Infrastructure policy impact assessment",
      support: 68.9,
      opposition: 22.4,
      neutral: 8.7,
      keyFindings: [
        "Strong support in developing regions",
        "Economic impact positive",
        "Job creation potential high",
      ],
    },
  },
  {
    id: 5,
    name: "Environmental Policy Study",
    date: "Nov 25, 2025",
    status: "in-progress",
    pages: 15,
    progress: 65,
  },
  {
    id: 6,
    name: "Monthly Simulation Summary - November",
    date: "Nov 30, 2025",
    status: "completed",
    pages: 45,
    content: {
      summary: "Comprehensive monthly summary of all simulations",
      support: 64.3,
      opposition: 26.1,
      neutral: 9.6,
      keyFindings: [
        "Overall positive trend in policy support",
        "Increased engagement in policy discussions",
        "Regional variations stabilizing",
      ],
    },
  },
];

export const mockHistory = [
  {
    id: 1,
    policy: "Healthcare Subsidy Increase",
    date: "Dec 5, 2025 14:32",
    duration: "45 min",
    status: "success",
    result: "67% support",
    details: {
      population: "1.2M",
      states: 28,
      demographics: ["Urban", "Rural", "All Income Levels"],
    },
  },
  {
    id: 2,
    policy: "Education Tax Credit",
    date: "Dec 4, 2025 11:15",
    duration: "38 min",
    status: "success",
    result: "72% support",
    details: {
      population: "950K",
      states: 25,
      demographics: ["Families", "Students", "Educators"],
    },
  },
  {
    id: 3,
    policy: "Carbon Tax Implementation",
    date: "Dec 3, 2025 16:48",
    duration: "52 min",
    status: "success",
    result: "45% support",
    details: {
      population: "1.5M",
      states: 28,
      demographics: ["All Regions", "Environmental Groups"],
    },
  },
  {
    id: 4,
    policy: "Agricultural Loan Waiver",
    date: "Dec 2, 2025 09:22",
    duration: "41 min",
    status: "failed",
    result: "Error in model",
    error: "Population data mismatch in rural regions",
    details: {
      population: "800K",
      states: 18,
    },
  },
  {
    id: 5,
    policy: "Infrastructure Investment Plan",
    date: "Dec 1, 2025 13:05",
    duration: "48 min",
    status: "success",
    result: "68% support",
    details: {
      population: "1.1M",
      states: 28,
      demographics: ["Urban", "Business Owners"],
    },
  },
  {
    id: 6,
    policy: "Digital India Initiative v2",
    date: "Nov 30, 2025 10:30",
    duration: "35 min",
    status: "success",
    result: "81% support",
    details: {
      population: "1.3M",
      states: 28,
      demographics: ["Tech Sector", "Youth", "Urban"],
    },
  },
  {
    id: 7,
    policy: "Minimum Wage Revision",
    date: "Nov 29, 2025 15:18",
    duration: "44 min",
    status: "success",
    result: "58% support",
    details: {
      population: "1.0M",
      states: 28,
      demographics: ["Workers", "Labor Unions"],
    },
  },
  {
    id: 8,
    policy: "Public Transport Subsidy",
    date: "Nov 28, 2025 12:45",
    duration: "39 min",
    status: "success",
    result: "74% support",
    details: {
      population: "900K",
      states: 22,
      demographics: ["Commuters", "Urban Dwellers"],
    },
  },
];

export const mockAnalytics = {
  trendData: [
    { month: "Jan", support: 45, opposition: 35, neutral: 20 },
    { month: "Feb", support: 48, opposition: 32, neutral: 20 },
    { month: "Mar", support: 52, opposition: 30, neutral: 18 },
    { month: "Apr", support: 58, opposition: 28, neutral: 14 },
    { month: "May", support: 62, opposition: 25, neutral: 13 },
    { month: "Jun", support: 65, opposition: 23, neutral: 12 },
    { month: "Jul", support: 67, opposition: 22, neutral: 11 },
    { month: "Aug", support: 68, opposition: 21, neutral: 11 },
    { month: "Sep", support: 69, opposition: 20, neutral: 11 },
    { month: "Oct", support: 70, opposition: 19, neutral: 11 },
    { month: "Nov", support: 71, opposition: 18, neutral: 11 },
    { month: "Dec", support: 72, opposition: 17, neutral: 11 },
  ],
  policyComparison: [
    { policy: "Healthcare", support: 78, opposition: 15, neutral: 7 },
    { policy: "Education", support: 72, opposition: 18, neutral: 10 },
    { policy: "Tax Reform", support: 45, opposition: 42, neutral: 13 },
    { policy: "Infrastructure", support: 68, opposition: 22, neutral: 10 },
    { policy: "Environment", support: 61, opposition: 28, neutral: 11 },
  ],
  sentimentData: [
    { name: "Positive", value: 62, color: "#22c55e" },
    { name: "Neutral", value: 23, color: "#6b7280" },
    { name: "Negative", value: 15, color: "#ef4444" },
  ],
  demographicBreakdown: [
    { demographic: "18-30", support: 78, opposition: 15, neutral: 7 },
    { demographic: "31-45", support: 72, opposition: 20, neutral: 8 },
    { demographic: "46-60", support: 65, opposition: 25, neutral: 10 },
    { demographic: "60+", support: 58, opposition: 30, neutral: 12 },
  ],
  stateWiseData: [
    { state: "Maharashtra", support: 75, opposition: 18, neutral: 7 },
    { state: "Karnataka", support: 72, opposition: 20, neutral: 8 },
    { state: "Tamil Nadu", support: 68, opposition: 22, neutral: 10 },
    { state: "Gujarat", support: 70, opposition: 21, neutral: 9 },
    { state: "Delhi", support: 78, opposition: 15, neutral: 7 },
  ],
};

export const mockSettings = {
  simulation: {
    autoSave: true,
    notifications: false,
    detailedLogs: false,
  },
  model: {
    fastConvergence: true,
    realTimeUpdates: true,
    populationSize: 1000000,
    iterations: 50,
  },
  data: {
    retentionDays: 90,
    exportFormat: "pdf",
  },
};

// Generate PDF report content
export const generateReportPDF = (report) => {
  const content = `
    ${report.name}
    Generated: ${report.date}
    
    ${report.content?.summary || "Report in progress"}
    
    Key Metrics:
    - Support: ${report.content?.support || "N/A"}%
    - Opposition: ${report.content?.opposition || "N/A"}%
    - Neutral: ${report.content?.neutral || "N/A"}%
    
    Key Findings:
    ${report.content?.keyFindings?.map((f) => `- ${f}`).join("\n") || "Analysis in progress"}
  `;
  return content;
};

// Download report as PDF
export const downloadReport = (report) => {
  const content = generateReportPDF(report);
  const blob = new Blob([content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${report.name.replace(/\s+/g, "_")}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

