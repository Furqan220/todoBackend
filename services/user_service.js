const UserModel = require('../models/user_model');
const jwt = require('jsonwebtoken');
class UserService {
    static async registerUser(email,password){
      try{
        const createUser = new UserModel({email,password});
        return await createUser.save();

    }catch(e){
        throw e;
      }
    };
    static async checkUser(email){
      try{
        const user = await UserModel.findOne({email});
        return user;
    }catch(e){
        throw e;
      }
    };
    static async generateToken(tokenData,secretKey,tokenExpiry){
      try{
        return jwt.sign(tokenData,secretKey,{expiresIn: tokenExpiry});
    }catch(e){
        throw e;
      }
    };

}

module.exports = UserService; 