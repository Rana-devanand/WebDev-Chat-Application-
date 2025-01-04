const express = require("express");
const router = express.Router();
const userContoller = require("../controllers/User_controllers");
const connection_id_controller = require("../controllers/Connection_id_Controller");
const messages_controller = require("../controllers/messages_controller");

// localhost:5000/api/users
router.post("/users", userContoller.create);
router.post("/login", userContoller.signIn);
router.get("/allusers", userContoller.getUsers);
router.get("/users/:roomId", userContoller.getUsersByRoomId);
router.get("/user/:userId", userContoller.getUsersExceptCurrentUser);

// connection id routes
router.post("/create_connection_id", connection_id_controller.createConnectionId);
router.get("/getallconnectionid/:from_room_id/:connect_user_room_id", connection_id_controller.getAllConnectionId);

// messages routes
router.post("/create_message", messages_controller.createMessage);
router.get("/get_messages_by_connection_id/:roomId", messages_controller.getMessagesByConnectionId);

module.exports = router;
