const logger = require('./logger');

let readyPlayercount = 0;

function listen(io) {
  const pongNamespace = io.of("/ping-pong");
  pongNamespace.on("connection", (socket) => {
    let room;

    logger.info(`User connected: ${socket.id}`);

    socket.on("disconnect", () => {
      logger.info(`User disconnected: ${socket.id}`);
    });

    socket.on("ready", () => {
      room = "room" + Math.floor(readyPlayercount / 2);
      socket.join(room);

      logger.info(`Player ready: ${socket.id} in ${room}`);
      readyPlayercount++;

      if (readyPlayercount % 2 === 0) {
        // Start game with both players
        pongNamespace.in(room).emit("start", socket.id);
      }
    });

    socket.on("ping", () => {
      logger.info("ping");
      socket.emit("pong");
    });

    socket.on("PaddleMove", (data) => {
      logger.info(`PaddleMove: ${JSON.stringify(data)}`);
      socket.to(room).emit("PaddleMove", data);
    });

    socket.on("ballMove", (data) => {
      logger.info(`ballMove: ${JSON.stringify(data)}`);
      socket.to(room).emit("ballMove", data);
    });

    socket.on("score", (data) => {
      logger.info(`score: ${JSON.stringify(data)}`);
      socket.broadcast.to(room).emit("score", data);
    });

    socket.on("disconnect", (reason) => {
      logger.info(`User disconnected: ${socket.id} due to ${reason}`);
      readyPlayercount--;
      socket.leave(room);
      // Notify other player in room
      socket.to(room).emit("playerDisconnected");
    });
  });
}

module.exports = { listen };
