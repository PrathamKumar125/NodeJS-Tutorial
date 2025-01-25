const friends = require("../models/friends_model");

function getFriends(req, res) {
  res.json(friends);
}

function getFriend(req, res) {
  const friendId = Number(req.params.friendId);
  const friend = friends[friendId];
  if (friend) {
    res.status(200).json(friend);
  } else {
    res.status(404).json({
      error: "Friend not found",
    });
  }
}

function postFriend(req, res) {
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
}

module.exports = {
  getFriends,
  getFriend,
  postFriend,
};
