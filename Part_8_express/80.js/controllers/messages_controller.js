const path = require("path");
const { title } = require("process");

function getMessages(req, res) {
  res.render("messages", { title: "Message to friend", friend: "John" });
  // res.sendFile(path.join(__dirname, "..", "public","images", "image.png"));
  // res.send("<html><body><h1>Hello, World!</h1></body></html>");
}

function postMessage(req, res) {
  console.loF("POST request received");
}

module.exports = {
  getMessages,
  postMessage,
};
