const express = require("express");
const { PORT } = require("./config/dotenv");

const http = require("http");
const app = express();
const {Server} = require("socket.io");
const server = http.createServer(app);

const cors = require("cors");
const bodyParser = require("body-parser");
// Database connection
const Connect = require("./config/db");
const ApiRoutes = require("./Routes/index");

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {

  socket.on("join_room", (data) => {
    socket.join(data.roomId);
    console.log("User joined room : ", data.roomId);
  });

  socket.on("message_send", (data) => {
    console.log("Message received : ", data);
    io.emit("message", data);
  });
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", ApiRoutes);



const CreateAndStartServer = () => {
  server.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
    Connect();
  });
};

CreateAndStartServer();
