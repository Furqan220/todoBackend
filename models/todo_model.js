const mongoose = require('mongoose');
const UserModel = require('./user_model');
const db = require('../config/db');


const { Schema } = mongoose;

const todoSchema = new Schema ({
    userId : {
        type: Schema.Types.ObjectId,
        required : true,
        ref: UserModel.modelName
    },
    title : {
        type:String,
        required : true,
    },
    desc : {
        type:String,
        required : true,
    }, 
    category : {
        type:String,
        required : true,
    },
    isCompleted : {
        type:Boolean,
        default : false

    }
   
},{timestamps:true});


const TodoModel = db.model('todos',todoSchema);

module.exports = TodoModel;
