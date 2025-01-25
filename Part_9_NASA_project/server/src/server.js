const http = require("http");

const app = require("./app");
const { loadPlanetsData } = require("./models/planets_model");
const {loadLaunchData} = require('./models/launches_model');
const { mongoConnect } = require("./services/mongo");

const PORT = process.env.PORT || 3001;

const server = http.createServer(app);

async function startServer() {
  await mongoConnect();
  await loadPlanetsData();
  await loadLaunchData();
  server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
