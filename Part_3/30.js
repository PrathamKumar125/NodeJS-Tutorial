const EventEmitter = require("events");
const celebrity = new EventEmitter();

// subscribe to the celebrity for observer 1
celebrity.on("race", (result) => {
  if (result === "win") {
    console.log("Congratulations, you won observer 1");
  }
});

// subscribe to the celebrity for observer 2
celebrity.on("race", (result) => {
  if (result === "win") {
    console.log("Congratulations, you won observer 2");
  }
});

process.on("exit", (code) => {
  console.log("You are exiting the program", code);
});

celebrity.emit("race win"); //event is emitted
celebrity.emit("race lost");
