import mongoose from "mongoose";

const {Schema} = mongoose

const messageSchema = new Schema({
    Firstname:String,
    Fastname:String,
    Email:String,
    Message:String,
    Time:{type:Date}
});

const messages = new mongoose.model('messageSchema',messageSchema)

export default messages