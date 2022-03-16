import mongoose from "mongoose";

const {Schema} = mongoose

const blogsSchema = new Schema({
    title:String,
    body:String,
    likes:{type:Number},
    comments:{type:Number},
    author:String,
    status:String,
    time:{type:Date}
  
});

const blogs = new mongoose.model('blogScheme',blogsSchema)

export default blogs