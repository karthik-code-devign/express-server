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

// Mount v1 API router
app.use("/v1", apiV1);

// Handle /api path (since Coolify is configured with /api in domain)
app.use("/api", (req, res, next) => {
  // Strip /api and redirect to appropriate endpoint
  const newPath = req.path === "/" ? "/v1/" : `/v1${req.path}`;
  res.redirect(newPath);
});

// Root endpoint - redirect to v1 API
app.get("/", (req, res) => {
  res.redirect("/v1/");
});

// Error handling middleware (must be before catch-all)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: "Internal Server Error",
    message: "Something went wrong!"
  });
});

// Catch-all for undefined routes (FIXED - use middleware without path)
app.use((req, res) => {
  res.status(404).json({
    error: "Not Found",
    message: `Route ${req.originalUrl} not found`,
    availableRoutes: [
      "/health",
      "/v1/",
      "/v1/status",
      "/api/* (redirects to /v1/*)"
    ]
  });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Express listening on ${port} (pid ${process.pid})`);
  console.log(`Available routes:`);
  console.log(`  GET /health`);
  console.log(`  GET /v1/`);
  console.log(`  GET /v1/status`);
  console.log(`  GET /api/* (redirects to /v1/*)`);
});
