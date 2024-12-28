const UserServices = require("../services/user_Services");

const userService = new UserServices();

const create = async (req, res) => {
  try {
    console.log(req.body);
    const response = await userService.createUser(req.body);
    return res.status(201).json({
      data: response,
      message: "User created successfully",
      success: true,
      err: {},
    });
  } catch (error) {
    console.log("Something went wrong in repo", error);
    return res.status(500).json({
      data: {},
      message: "Failed to create user",
      success: false,
      err: error,
    });
  }
};

const signIn = async (req , res) => {
  try {
    const response = await userService.signIn(req.body);
    return res.status(200).json({
      data : response ,
      message : "User signed in successfully" ,
      success : true ,
      err : {}
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      data : {} ,
      message : "Failed to sign in" ,
      success : false ,
      err : error
    })
  }
}

const getUsers = async (req , res) => {
  try {
    const response = await userService.getUsers();
    return res.status(200).json({
      data : response ,
      message : "Users fetched successfully" ,
      success : true ,
      err : {}
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      data : {} ,
      message : "Failed to fetch users" ,
      success : false ,
      err : error
    })
  }
}

const getUsersByRoomId = async (req , res) => {
  try {
    const response = await userService.getUsersByRoomId(req.params.roomId);
    return res.status(200).json({
      data : response ,
      message : "Users fetched successfully" ,
      success : true ,
      err : {}
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      data : {} ,
      message : "Failed to fetch users" ,
      success : false ,
      err : error
    })
  }
}   

const getUsersExceptCurrentUser = async (req , res) => {
  try {
    const response = await userService.getUsersExceptCurrentUser(req.params.userId);
    return res.status(200).json({
      data : response ,
      message : "Users fetched successfully" ,
      success : true ,
      err : {}
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      data : {} ,
      message : "Failed to fetch users" ,
      success : false ,
      err : error
    })
  }
}

module.exports = {
  create,
  signIn,
  getUsers,
  getUsersByRoomId,
  getUsersExceptCurrentUser
};

