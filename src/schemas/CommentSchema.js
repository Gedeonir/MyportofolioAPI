import mongoose from "mongoose";

const {Schema} = mongoose

const commentSchema = new Schema({
    blogid:String,
    comment:String,
    names:String,
    email:String,
    time:{type:Date}
  
});

const comment = new mongoose.model('commentchema',commentSchema)

export default comment