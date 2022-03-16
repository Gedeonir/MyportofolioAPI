import subscriptionModel from "../schemas/subscriptionsSchema.js"


const subscriptionValidator = async(req,res,next)=>{
    if(!req.body.email) return res.json({Error:"email can not be empty"})
    const data = req.body.email;
    const subscription = await subscriptionModel.findOne({email: data});
    if(subscription) return res.status(400).json({Error:`email already subscribed`})
    next() 
} 

export {subscriptionValidator as default}