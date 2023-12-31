const mongoose = require('mongoose');
const db = require('../config/db');
const bcrypt = require('bcrypt');


const { Schema } = mongoose;

const userSchema = new Schema ({
    email : {
        type:String,
        lowercase : true,
        required : true,
        unique: true,
    },
    password : {
        type:String,
        required : true,
    },
    username : {
        type:String,
        required : true,
    },
},{timestamps:true});

userSchema.pre('save',async function () {
   try {
    var user = this;
    const salt = await(bcrypt.genSalt(10));
    const hashpass = await bcrypt.hash(user.password , salt);
    user.password = hashpass;
   } catch (error) {
    throw error;
   } 
});

userSchema.methods.comparePassword = async function(userPass) {
  try {
    return await bcrypt.compare(userPass,this.password);
  } catch (error) {
    throw e ; 
  }  
};

const UserModel = db.model('users',userSchema);

module.exports = UserModel;
