import mongoose from "mongoose";

const {Schema} = mongoose

const skillSchema = new Schema({
    skillTitle:String,
    description:String,
    time:{type:Date}
  
});

const skill = new mongoose.model('skillcheme',skillSchema)

export default skill