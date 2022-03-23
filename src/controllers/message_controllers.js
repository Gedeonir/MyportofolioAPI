import messageModel from "../schemas/messageSchema.js"
import jwt from 'jsonwebtoken'
import config from '../../config.js'

const {secret} = config 

const createmessage = async(req, res) => {
    try {
      const messageresult= await messageModel.create({
        Firstname:req.body.firstname,
        Lastname:req.body.lastname,
        Email:req.body.email,
        Message:req.body.message, 
        Time:Date.now()
  
  
      })
      res.status(201).json({
        message:'message sent',
        data:messageresult,
    })
    
    } catch (error) {
        res.status(409).json({Error:`unable to send message`})
        console.log(error)
    }
  
  
  
}

const readmessage = async(req,res)=>{
  const messageid = req.params.id; 

  const token = await req.headers['authorization'].split(' ')[1]; 
 
  const user = jwt.verify(token,secret); 
  if (user.user.role != 'admin') {
    return res.status(401).json({Error:"Access denied,you need to login as admin"})
  }else{
    try {
        const singlemessage = await messageModel.findById(messageid)
        res.status(200).json({
          message:`message ${messageid} fetched succesfully`,
          data:singlemessage
        }) 
    } catch (error) {
        res.status(409).json({Error:`message ${messageid} not found`})
    }
  }
}

const getAllmessage =  async(req,res)=>{
  
  const token = await req.headers['authorization'].split(' ')[1]; 
 
  const user = jwt.verify(token,secret); 
  if (user.user.role != 'admin') {
    return res.status(401).json({Error:"Access denied,you need to login as admin"})
  }else{
    try {
        const messagess = await messageModel.find().sort({time:-1})
        res.status(200).json(
          messagess
    
        )
    } catch (error) {
        res.status(409).json({Error:`Unable to fetch messages`})
        
    }
  }
}

const deletemessage =async(req,res)=>{
  const id = req.params.id;
  const token = await req.headers['authorization'].split(' ')[1]; 
 
  const user = jwt.verify(token,secret); 
  if (user.user.role != 'admin') {
    return res.status(401).json({Error:"Access denied,you need to login as admin"})
  }else{
  
    try {
      const deleteMessage = await messageModel.findByIdAndDelete(id)
      res.status(200).json({
        message:`message ${id} deleted succesfully`,
      })
    } catch (error) {
      res.status(409).json({Error:`Unable to delete message`,error})
    }
  }

}
const deleteallmessages =async(req,res)=>{
  const token = await req.headers['authorization'].split(' ')[1]; 
 
  const user = jwt.verify(token,secret); 
  if (user.user.role != 'admin') {
    return res.status(401).json({Error:"Access denied,you need to login as admin"})
  }else{ 
    try {
      const allmessages = await messageModel.deleteMany()
      res.status(200).json({
        message:`messages deleted succesfully`,
        data:allmessages
      })
    } catch (error) {
      res.status(409).json({Error:`Unable to delete messages`,error})
    }
  }
}
export {createmessage,readmessage,getAllmessage,deletemessage,deleteallmessages}