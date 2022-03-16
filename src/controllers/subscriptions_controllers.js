import subscriptionModel from "../schemas/subscriptionSchema.js"
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'


dotenv.config()

const secerete = process.env.JWT_SECRET

const createsubscription = async(req, res) => {
    try {
      const subscriptionresult= await subscriptionModel.create({
        Email:req.body.email,
        Time:Date.now()
  
  
      })
      res.status(201).json({
        subscription:'you have suscribed to our newsletter',
        data:subscriptionresult,
    })
    
    } catch (error) {
        res.status(409).json({Error:`unable to send subscription`})
        console.log(error)
    }
  
  
  
}

const readsubscription = async(req,res)=>{
    const subscriptionid = req.params.id;

    try {
        const singlesubscription = await subscriptionModel.findById(subscriptionid)
        res.status(200).json({
          subscription:`subscription ${subscriptionid} fetched succesfully`,
          data:singlesubscription
        })
    } catch (error) {
        res.status(409).json({Error:`subscription ${subscriptionid} not found`})
    }
}

const getAllsubscription =  async(req,res)=>{
  const token = req.headers.authorization.split(' ')[1]; 
  const user = jwt.verify(token,secerete); 
  if (user.user.role != 'admin') {
    return res.status(401).json({Error:"Access denied,you need to login as admin"})
  }else{
    try {
      const subscriptions = await subscriptionModel.find().sort({time:-1})
      res.status(200).json({
        message:"subscriptions fetched succesfully",
        data:subscriptions
  
      })
    } catch (error) {
      res.status(409).json({Error:`Unable to fetch subscriptions`})
        
    }
  } 
}



const deletesubscription = async(req,res)=>{
  const id = req.params.id;
  try {
    const removeSub = await subscriptionModel.findByIdAndDelete(id)
    res.status(200).json({
      message:`you have unsubscribed to our newsletter`,
    })
  } catch (error) {
    res.status(409).json({Error:`Unable unsubscribe`,error})
  }
  

}

const deleteallsubscriptions =async(req,res)=>{ 
  const token = req.headers.authorization.split(' ')[1]; 
  const user = jwt.verify(token,secerete); 
  if (user.user.role != 'admin') {
    return res.status(401).json({Error:"Access denied,you need to login as admin"})
  }else{
    try {
      const allsubscriptions = await subscriptionModel.deleteMany()
      res.status(200).json({
        message:`subcription deleted succesfully`,
        data:allsubscriptions
      })
    } catch (error) {
      res.status(409).json({Error:`Unable to delete subcription`,error})
    }
  }
}
export {createsubscription,readsubscription,getAllsubscription,deletesubscription,deleteallsubscriptions}