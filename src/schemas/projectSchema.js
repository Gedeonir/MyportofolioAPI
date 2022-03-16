import mongoose from "mongoose";

const {Schema} = mongoose

const projectSchema = new Schema({
    projectTitle:String,
    description:String,
    Technologies:String,
    time:{type:Date}
  
});

const project = new mongoose.model('projectcheme',projectSchema)

export default project