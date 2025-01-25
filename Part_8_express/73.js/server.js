const express = require("express");

const app = express();

const PORT = 3000;

const friends = [
  {
    id: 1,
    name: "john",
  },
  {
    id: 2,
    name: "jane",
  },
  {
    id: 3,
    name: "jim",
  },
];

// Middleware
app.use((req, res, next) => {
  const start = Date.now();

  next(); //required for request to continue

  const delta = Date.now() - start;
  console.log(`${req.method} ${req.url} ${delta}ms`);
});

app.use(express.json());

app.get("/friends", (req, res) => {
  res.json(friends);
});

app.get("/friends/:friendId", (req, res) => {
  const friendId = Number(req.params.friendId);
  const friend = friends[friendId];
  if (friend) {
    res.status(200).json(friend);
  } else {
    res.status(404).json({
      error: "Friend not found",
    });
  }
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/friends", (req, res) => {
  if (!req.body.name) {
    return res.status(400).json({
      error: "name is required",
    });
  }
  const newFriend = {
    name: req.body.name,
    id: friends.length + 1,
  };
  friends.push(newFriend);
  res.json(newFriend);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
