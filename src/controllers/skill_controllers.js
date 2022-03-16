import skillsModel from "../schemas/skillSchema.js"
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'


dotenv.config()

const secerete = process.env.JWT_SECRET


const createskill = async(req,res)=>{
  const skillid = req.params.id;
  const token = req.headers.authorization.split(' ')[1]; 
 
  const user = jwt.verify(token,secerete); 
  if (user.user.role != 'admin') {
    return res.status(401).json({Error:"Access denied,you need to login as admin"})
  }else{
    try {
      const result= await skillsModel.create({
          skillTitle:req.body.skillTitle,
          description:req.body.description,
          time:Date.now()
      })
      res.status(201).json({
          message:'skill created succesfully',
          data:result,
      })
    } catch (error) {
      res.status(409).json({Error:`unable to create skill`})
    }
  } 
}

const readskill = async(req,res)=>{
    const skillid = req.params.id;

    try {
        const singleskill = await skillsModel.findById(skillid)
        res.status(200).json({
          message:`skill ${skillid} fetched succesfully`,
          data:singleskill
        })
    } catch (error) {
        res.status(409).json({Error:`skill ${skillid} not found`})
    }
}

const getAllskill =  async(req,res)=>{
    try {
        const skills = await skillsModel.find().sort({time:-1})
        res.status(200).json({
          message:"skills fetched succesfully",
          data:skills
    
        })
      } catch (error) {
        res.status(409).json({Error:`Unable to fetch skills`})
        
      }
    
}

const updateskill = async(req,res)=>{
  const skillid = req.params.id;
  const token = req.headers.authorization.split(' ')[1]; 
 
  const user = jwt.verify(token,secerete); 
  if (user.user.role != 'admin') {
    return res.status(401).json({Error:"Access denied,you need to login as admin"})
  }else{

    try {
      const singleskill = await skillsModel.findByIdAndUpdate(skillid,{
        ...req.body
      })
      res.status(200).json({
        message:`skill ${skillid} updated succesfully`,
        data:singleskill
      })
    } catch (error) {
      res.status(409).json({Error:`Unable to update skill, skill ${skillid} not found`})
    }
  }
}

const deleteskill =async(req,res)=>{ 
  const skillid = req.params.id
  const token = req.headers.authorization.split(' ')[1]; 
 
  const user = jwt.verify(token,secerete); 
  if (user.user.role != 'admin') {
    return res.status(401).json({Error:"Access denied,you need to login as admin"})
  }else{
    try {
      const singleskill = await skillsModel.findByIdAndDelete(skillid)
      res.status(200).json({
        message:`skill ${skillid} deleted succesfully`,
      })
    } catch (error) {
      res.status(409).json({Error:`Unable to delete skill`})
    }
  }
}
const deleteallskills =async(req,res)=>{ 
  const token = req.headers.authorization.split(' ')[1]; 
  const user = jwt.verify(token,secerete); 
  if (user.user.role != 'admin') {
    return res.status(401).json({Error:"Access denied,you need to login as admin"})
  }else{
    try {
      const allskill = await skillsModel.deleteMany()
      res.status(200).json({
        message:`skills deleted succesfully`,
        data:allskill
      })
    } catch (error) {
      res.status(409).json({Error:`Unable to delete skills`,error})
    }
  }
}

export {createskill,readskill,getAllskill,updateskill,deleteskill,deleteallskills}