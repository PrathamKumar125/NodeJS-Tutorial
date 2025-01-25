const fs = require("fs");
const path = require("path");
const { parse } = require("csv-parse");

const planets = require("./planets.mongo");

function isHabitablePlanet(planet) {
  return (
    planet["koi_disposition"] === "CONFIRMED" &&
    planet["koi_insol"] > 0.36 &&
    planet["koi_insol"] < 1.11 &&
    planet["koi_prad"] < 1.6
  );
}

// Promise is a JavaScript object that represents the eventual completion (or failure) of an asynchronous operation and its resulting value.
function loadPlanetsData() {
  return new Promise((resolve, reject) => {
    fs.createReadStream(
      path.join(__dirname, "..", "..", "data", "kepler_data.csv")
    )
      .pipe(
        parse({
          comment: "#",
          columns: true,
        })
      )
      .on("data", async (data) => {
        if (isHabitablePlanet(data)) {
          await savePlanet(data);
        }
      })
      .on("error", (err) => {
        console.log(err);
        reject(err); // reject the promise
      })
      .on("end", async () => {
        const countPlanets = (await getAllPlanets()).length;
        resolve(); // resolve the promise
      });
    });
  }
  
  async function getAllPlanets() {
    return await planets.find({}, { _id: 0, __v: 0 });
  }
  
  async function savePlanet(planet) {
    try {
      console.log(`Saving planet: ${planet.kepler_name}`);
      await planets.updateOne(
        {
          keplerName: planet.kepler_name,
        },
        {
          keplerName: planet.kepler_name,
        },
        {
        // upsert: true - If no document matches the query, MongoDB will insert a new document
        upsert: true,
      }
    );
    console.log(`Saved planet: ${planet.kepler_name}`);
  } catch (err) {
    console.error(`Failed save planet ${err}`);
  }
}

module.exports = {
  loadPlanetsData,
  getAllPlanets,
};
