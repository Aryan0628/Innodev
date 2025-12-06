import express from "express";

const router = express.Router();

// Test route - redirect to dashboard frontend
router.get("/test", (req, res) => {
  // Redirect to the dashboard page on the frontend
  res.redirect("http://localhost:5173/dashboard");
});

// Test route that returns JSON (for API testing)
router.get("/test/api", (req, res) => {
  res.json({
    success: true,
    message: "Dashboard API is working!",
    timestamp: new Date().toISOString(),
    data: {
      serverStatus: "online",
      apiVersion: "1.0.0",
      redirectUrl: "http://localhost:5173/dashboard",
    },
  });
});

// Mock dashboard data for testing
router.get("/data", (req, res) => {
  res.json({
    success: true,
    message: "Dashboard data retrieved",
    data: {
      metrics: {
        totalSimulations: 42,
        activeUsers: 156,
        avgSentiment: 68.5,
        lastUpdated: new Date().toISOString(),
      },
      states: [
        { id: "DL", name: "Delhi", support: 78 },
        { id: "MH", name: "Maharashtra", support: 65 },
        { id: "KA", name: "Karnataka", support: 72 },
        { id: "TN", name: "Tamil Nadu", support: 58 },
        { id: "GJ", name: "Gujarat", support: 81 },
      ],
      demographics: [
        { category: "Urban", support: 72, opposition: 28 },
        { category: "Rural", support: 54, opposition: 46 },
        { category: "Youth (18-35)", support: 68, opposition: 32 },
        { category: "Middle-aged (36-55)", support: 61, opposition: 39 },
        { category: "Senior (55+)", support: 58, opposition: 42 },
      ],
      timeline: [
        { month: "Jan", support: 45, opposition: 55 },
        { month: "Feb", support: 52, opposition: 48 },
        { month: "Mar", support: 58, opposition: 42 },
        { month: "Apr", support: 63, opposition: 37 },
        { month: "May", support: 68, opposition: 32 },
      ],
    },
  });
});

// Simulate policy endpoint
router.post("/simulate", (req, res) => {
  const { policyName, parameters } = req.body;

  res.json({
    success: true,
    message: "Policy simulation started",
    data: {
      simulationId: `sim_${Date.now()}`,
      policy: policyName || "Unknown Policy",
      parameters: parameters || {},
      status: "running",
      estimatedCompletion: "2-3 minutes",
    },
  });
});

// Get user dashboard info
router.get("/user", (req, res) => {
  res.json({
    success: true,
    message: "User dashboard info retrieved",
    data: {
      username: "Test User",
      email: "user@example.com",
      role: "analyst",
      recentSimulations: 5,
      lastLogin: new Date().toISOString(),
    },
  });
});

export default router;
