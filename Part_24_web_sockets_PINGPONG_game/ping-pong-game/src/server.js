const http = require("http");
const socketIo = require("socket.io");
const logger = require("./logger");

const apiServer = require("./api");
const sockets = require("./sockets");

const httpServer = http.createServer(apiServer);
const io = socketIo(httpServer);

const PORT = process.env.PORT || 3000;

httpServer.listen(PORT, () => {
  logger.info(`Server is listening on port ${PORT}`);
});

sockets.listen(io);
