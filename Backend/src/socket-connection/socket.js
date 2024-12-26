const socketIo = require("socket.io");

const io = socketIo({
  cors: {
    origin: "http://localhost/5173",
    methods: ["GET", "POST"],
  },
});
