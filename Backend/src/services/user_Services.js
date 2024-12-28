const UserRepository = require("../Repository/user_Repository");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {JWT_KEY} = require("../config/dotenv");

class UserServices {
  constructor() {
    this.userRepository = new UserRepository();
  }
  async createUser(data) {
    try {
      const response = await this.userRepository.createUser(data);
      return response;
    } catch (error) {
      console.error(error);
      throw { error };
    }
  }

  async signIn(data){
    try {
      const response = await this.userRepository.getByEmail(data.email);
      if(!response){
        throw {message : "User not found"}
      }
      const isPasswordMatch = bcrypt.compareSync(data.password , response.password);
      if(!isPasswordMatch){
        throw {message : "Password is incorrect"}
      }
      const token = jwt.sign({id : response._id} , JWT_KEY , {expiresIn : "1h"});
      return {token , response};

    } catch (error) {
      console.error(error);
      throw { error };
    }
  }

  async getUsers(){
    try {
      const response = await this.userRepository.getUsers();
      return response;
    } catch (error) {
      console.error(error);
      throw { error };
    }
  }

  async getUsersByRoomId(userID){
    try {
      const response = await this.userRepository.getUsersByRoomId(userID);
      return response;
    } catch (error) {
      console.error(error);
      throw { error };
    }
  }

  async getUsersExceptCurrentUser(userId){
    try {
      const response = await this.userRepository.getUsersExceptCurrentUser(userId);
      return response;
    } catch (error) {
      console.error(error);
      throw { error };
    }
  }
}

module.exports = UserServices;
