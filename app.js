const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const api = express.Router()

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

app.use('v1', api);

app.get('/', (req, res) => res.redirect('/v1/'));

app.listen(port, () => {
  console.log(`Express listening on ${port} (pid ${process.pid})`);
});
