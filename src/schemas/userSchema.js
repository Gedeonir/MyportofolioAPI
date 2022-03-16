import mongoose from "mongoose";

const {Schema} = mongoose

const usersSchema = new Schema({
    firstname:String,
    lastname:String,
    contact:Number,
    email:String,
    password: {type:String,select:false},
    gender:String,
    username:String,
    role:String,
    time:{type:Date}
  
});

const users = new mongoose.model('userSchema',usersSchema)

export default users