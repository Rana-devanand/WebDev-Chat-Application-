const socketIo = require("socket.io");

const io = socketIo({
  cors: {
    origin: "http://localhost:5174",
    methods: ["GET", "POST"],
  },
});

module.exports = io;

