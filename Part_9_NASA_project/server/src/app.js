const path = require("path");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const planetsRouter = require("./routes/planets/planets_router");
const launchesRouter = require("./routes/launches/launches_router");

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
  })
);
app.use(morgan("combined"));
app.use(express.json());

// Serve built client files from client/build
app.use(express.static(path.join(__dirname, "..", "..", "client", "build")));

// API routes
app.use("/v1/planets", planetsRouter);
app.use("/v1/launches", launchesRouter);

// Serve React app for all other routes
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "..", "client", "build", "index.html"));
});

module.exports = app;
