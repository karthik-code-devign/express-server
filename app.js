const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.json({
    message: "Hello from PaperStreetWeb API",
    pid: process.pid,
    host: req.headers.host,
    path: req.path,
    time: new Date().toISOString(),
  });
});

app.get("/health", (req, res) => res.send("ok"));

app.listen(port, () => {
  console.log(`Express listening on ${port} (pid ${process.pid})`);
});
