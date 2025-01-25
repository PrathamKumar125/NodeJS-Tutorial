const express = require("express");

const app = express();

const PORT = 3000;

// Express matches the route one by one and stops when it finds a match 

app.get("/friends", (req, res) => {
  res.send({
    id: 1,
    message: "john",
  });
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/messages", (req, res) => {
  res.send("<html><body><h1>Hello, World!</h1></body></html>");
});

app.post("/messages", (req, res) => {
  console.log("POST request received");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
