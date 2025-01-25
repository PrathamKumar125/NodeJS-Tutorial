const { parse } = require("csv-parse");
const fs = require("fs");

const habitableplants = [];

function isHabitalablePlanet(planet) {
  return (
    planet["koi_disposition"] === "CONFIRMED" &&
    planet["koi_insol"] > 0.36 &&
    planet["koi_insol"] < 1.11 &&
    planet["koi_prad"] < 1.6
  );
}

fs.createReadStream("kepler_data.csv")
  .pipe(
    parse({
      comment: "#",
      columns: true,
    })
  )
  .on("data", (data) => {
    if (isHabitalablePlanet(data)) habitableplants.push(data);
  })
  .on("error", (err) => {
    console.log(err);
  })
  .on("end", () => {
    console.log(habitableplants.map((planet) => planet["kepler_name"]));
    console.log(`${habitableplants.length} habitable planets found!`);
    console.log("Done");
  });
