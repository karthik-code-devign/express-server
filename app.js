const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const api = express.Router();

// Example route inside /v1
api.get("/", (req, res) => {
  res.json({
    message: "Hello from PaperStreetWeb API (v1)",
    pid: process.pid,
    host: req.headers.host,
    path: req.originalUrl,
    time: new Date().toISOString(),
  });
});

// health check (always available without redirect)
app.get("/health", (req, res) => res.send("ok"));

// mount v1 API
app.use("/v1", api);

// redirect root → /v1/
app.get("/", (req, res) => res.redirect("/v1/"));

app.listen(port, '0.0.0.0', () => {
  console.log(`Express listening on ${port} (pid ${process.pid})`);
});
