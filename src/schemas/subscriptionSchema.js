import mongoose from "mongoose";

const {Schema} = mongoose

const subscriptionSchema = new Schema({
    Firstname:String,
    Fastname:String,
    Email:String,
    Message:String,
    Time:{type:Date}
});

const subscriptions = new mongoose.model('subscriptionschema',subscriptionSchema)

export default subscriptions