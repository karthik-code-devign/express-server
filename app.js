const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

// Create API router for v1 endpoints
const apiV1 = express.Router();

// V1 API routes
apiV1.get("/", (req, res) => {
  res.json({
    message: "Hello from PaperStreetWeb API (v1)",
    pid: process.pid,
    host: req.headers.host,
    path: req.originalUrl,
    time: new Date().toISOString(),
  });
});

// Add more v1 routes here as needed
apiV1.get("/status", (req, res) => {
  res.json({
    status: "running",
    version: "1.0.0",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// Health check endpoint (available at root level)
app.get("/health", (req, res) => {
  res.status(200).send("ok");
});

// Mount v1 API router at different paths
app.use("/v1", apiV1);
app.use("/api/v1", apiV1);
app.use("/test/v1", apiV1);

// Direct API endpoints at /api
app.get("/api", (req, res) => {
  res.json({
    message: "Hello from PaperStreetWeb API",
    pid: process.pid,
    host: req.headers.host,
    path: req.originalUrl,
    time: new Date().toISOString(),
  });
});

app.get("/api/status", (req, res) => {
  res.json({
    status: "running",
    version: "1.0.0",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// Direct API endpoints at /test
app.get("/test", (req, res) => {
  res.json({
    message: "Hello from PaperStreetWeb API (test endpoint)",
    pid: process.pid,
    host: req.headers.host,
    path: req.originalUrl,
    time: new Date().toISOString(),
  });
});

app.get("/test/status", (req, res) => {
  res.json({
    status: "running",
    version: "1.0.0",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// Root endpoint - show API info
app.get("/", (req, res) => {
  res.json({
    name: "PaperStreetWeb API",
    version: "1.0.0",
    endpoints: {
      health: "/health",
      v1: "/v1/",
      api: "/api/",
      test: "/test/",
      "v1-status": "/v1/status",
      "api-status": "/api/status",
      "test-status": "/test/status"
    }
  });
});

// Error handling middleware (must be before catch-all)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: "Internal Server Error",
    message: "Something went wrong!"
  });
});

// Catch-all for undefined routes
app.use((req, res) => {
  res.status(404).json({
    error: "Not Found",
    message: `Route ${req.originalUrl} not found`,
    availableRoutes: [
      "/health",
      "/",
      "/v1/",
      "/v1/status",
      "/api/",
      "/api/status", 
      "/api/v1/",
      "/api/v1/status",
      "/test/",
      "/test/status",
      "/test/v1/",
      "/test/v1/status"
    ]
  });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Express listening on ${port} (pid ${process.pid})`);
  console.log(`Available routes:`);
  console.log(`  GET /health`);
  console.log(`  GET /`);
  console.log(`  GET /v1/`);
  console.log(`  GET /v1/status`);
  console.log(`  GET /api/`);
  console.log(`  GET /api/status`);
  console.log(`  GET /api/v1/`);
  console.log(`  GET /api/v1/status`);
  console.log(`  GET /test/`);
  console.log(`  GET /test/status`);
  console.log(`  GET /test/v1/`);
  console.log(`  GET /test/v1/status`);
});
