const user = require("../models/Users_model");
const {SALT} = require("../config/dotenv");
const bcrypt = require("bcrypt");

class UserRepository {
  async createUser(data) {
    try {
      const HashPassword = bcrypt.hashSync(data.password , SALT);
      const response = await user.create({...data , password : HashPassword});
      return response;
    } catch (error) {
      console.error(error);
      throw { error };
    }
  }

  async getByEmail(email){
    try {
      const response = await user.findOne({email});
      return response;
    } catch (error) {
      console.error(error);
      throw { error };
    }
  }

  async getUsers(){
    try {
      const response = await user.find();
      return response;
    } catch (error) {
      console.error(error);
      throw { error };
    }
  }
  // get all users 
  async getUsersByRoomId(roomId){
    try {
      const response = await user.find({roomId});
      return response;
    } catch (error) {
      console.error(error);
      throw { error };
    }
  }
  // get all users except current user
  async getUsersExceptCurrentUser(userId) {
    try {
      console.log(userId);
      const response = await user.find({ _id: { $ne: userId } });
      return response;
    } catch (error) {
      console.error(error);
      throw { error };
    }
  } 


}

module.exports = UserRepository;
