const express = require("express");
const router = express.Router();
const userContoller = require("../controllers/User_controllers");

// localhost:5000/api/users
router.post("/users", userContoller.create);
router.post("/login", userContoller.signIn);
router.get("/allusers", userContoller.getUsers);
router.get("/users/:roomId", userContoller.getUsersByRoomId);
router.get("/user/:userId", userContoller.getUsersExceptCurrentUser);


module.exports = router;
