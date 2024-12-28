const express = require("express");
const app = express();
const { PORT } = require("./config/dotenv");
const http = require("http");
const server = http.createServer(app);
const cors = require("cors");
const socketIo = require("socket.io");
const bodyParser = require("body-parser");
// Database connection
const Connect = require("./config/db");
const ApiRoutes = require("./Routes/index");

const io = socketIo({
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", ApiRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the chat server");
});

const CreateAndStartServer = () => {
  server.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
    Connect();
  });
};

CreateAndStartServer();
