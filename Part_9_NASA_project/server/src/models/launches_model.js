const axios = require("axios");

const launchesDatabse = require("./launches.mongo");
const planets = require("./planets.mongo");

let DefaultFlightNumber = 100;
const SPACEX_API_URL = "https://api.spacexdata.com/v4/launches/query";

async function populateLaunches() {
  try {
    console.log("Downloading launch data...");
    const response = await axios.post(SPACEX_API_URL, {
      query: {},
      options: {
        pagination: false,
        populate: [
          {
            path: "rocket",
            select: {
              name: 1,
            },
          },
          {
            path: "payloads",
            select: {
              customers: 1,
            },
          },
        ],
      },
    });

    if (response.status !== 200) {
      console.log("Problem downloading launch data");
      throw new Error("Launch data download failed");
    }

    const launchDocs = response.data.docs;
    for (const launchDoc of launchDocs) {
      const payloads = launchDoc["payloads"];
      const customers = payloads.flatMap((payload) => {
        return payload["customers"];
      });

      const launch = {
        flightNumber: launchDoc["flight_number"],
        mission: launchDoc["name"],
        rocket: launchDoc["rocket"]["name"],
        launchDate: launchDoc["date_local"],
        upcoming: launchDoc["upcoming"],
        success: launchDoc["success"],
        customers,
      };

      console.log(`${launch.flightNumber} ${launch.mission}`);
      await saveLaunch(launch);
    }
  } catch (err) {
    console.error("Error downloading launch data:", err);
  }
}

async function loadLaunchData() {
  const firstLaunch = await findLaunch({
    flightNumber: 1,
    rocket: "Falcon 1",
    mission: "FalconSat",
  });
  if (firstLaunch) {
    console.log("Launch data already loaded!");
  } else {
    await populateLaunches();
  }
}

async function findLaunch(filter) {
  return await launchesDatabse.findOne(filter);
}

async function existsLaunchWithId(launchId) {
  return await findLaunch({
    flightNumber: launchId,
  });
}

async function getAllLaunches(skip, limit) {
  return await launchesDatabse
    .find({}, { _id: 0, __v: 0 })
    .sort({ flightNumber: 1 })
    .skip(skip)
    .limit(limit)
    .lean();
}

async function getLatestFlightNumber() {
  const latestLaunch = await launchesDatabse.findOne({}).sort("-flightNumber");
  
  if (!latestLaunch) {
    return DefaultFlightNumber;
  }
  
  // Add validation to ensure flightNumber is a valid number
  const latestFlightNumber = latestLaunch.flightNumber;
  return isNaN(latestFlightNumber) ? DefaultFlightNumber : latestFlightNumber;
}

async function saveLaunch(launch) {
  // Validate flightNumber before saving
  if (!launch.flightNumber || isNaN(launch.flightNumber)) {
    throw new Error('Invalid flight number');
  }

  await launchesDatabse.findOneAndUpdate(
    {
      flightNumber: launch.flightNumber,
    },
    launch,
    {
      upsert: true,
    }
  );
}

async function abortLaunchById(launchId) {
  const aborted = await launchesDatabse.updateOne({
    flightNumber: launchId,
  }, {
    $set: {
      upcoming: false,
      success: false,
    }
  });
  return aborted.modifiedCount === 1;
}

async function scheduleNewLaunch(launch) {
  const planet = await planets.findOne({
    keplerName: launch.target,
  });

  if (!planet) {
    throw new Error("No matching planet found");
  }

  const newFlightNumber = await getLatestFlightNumber();
  const nextFlightNumber = isNaN(newFlightNumber) ? DefaultFlightNumber : newFlightNumber + 1;

  const newLaunch = Object.assign(launch, {
    success: true,
    upcoming: true,
    customers: ["NASA"],
    flightNumber: nextFlightNumber,
  });

  await saveLaunch(newLaunch);
  return newLaunch;
}

// Add to exports
module.exports = {
  loadLaunchData,
  existsLaunchWithId,
  getAllLaunches,
  scheduleNewLaunch, // Add this
  abortLaunchById,
  saveLaunch,
};
