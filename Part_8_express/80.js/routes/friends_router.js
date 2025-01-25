const express = require("express");

const friendsController = require("../controllers/friends_controller");

const friendRouter = express.Router();

// Middleware for only friendRouter
friendRouter.use((req, res, next) => {
  console.log("Friends Router Middleware");
  next();
}); 

friendRouter.get("/", friendsController.getFriends);
friendRouter.get("/:friendId", friendsController.getFriend);
friendRouter.post("/", friendsController.postFriend);

module.exports = friendRouter;