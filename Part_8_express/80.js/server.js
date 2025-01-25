const express = require("express");
const path = require("path");

const friendRouter = require("./routes/friends_router");
const messageRouter = require("./routes/messages_router");

const app = express();

// Handlebars
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

const PORT = 3000;

// Middlewares: Logging, Body parsing
app.use((req, res, next) => {
  const start = Date.now();
  next();
  const delta = Date.now() - start;
  console.log(`${req.method} ${req.baseUrl}${req.url} ${delta}ms`);
});
app.use("/site", express.static(path.join(__dirname, "public")));
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.render("index", 
    { title: "Home", 
      caption: "Welcome to the Home Page" 
    });
});
app.use("/friends", friendRouter);
app.use("/messages", messageRouter);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
