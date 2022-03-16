import projectsModel from "../schemas/projectSchema.js"
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'


dotenv.config()

const secerete = process.env.JWT_SECRET


const createproject = async(req,res)=>{
  const token = req.headers.authorization.split(' ')[1]; 
 
  const user = jwt.verify(token,secerete); 
  if (user.user.role != 'admin') {
    return res.status(401).json({Error:"Access denied,you need to login as admin"})
  }else{
    try {
        const result= await projectsModel.create({
            projectTitle:req.body.title,
            description:req.body.description,
            Technologies:req.body.technologies,
            time:Date.now()
        })
        res.status(201).json({
            message:'project created succesfully',
            data:result,
        })
    } catch (error) {
        res.status(409).json({Error:`unable to create project`})
    } 
  } 
}

const readproject = async(req,res)=>{
    const projectid = req.params.id;

    try {
        const singleproject = await projectsModel.findById(projectid)
        res.status(200).json({
          message:`project ${projectid} fetched succesfully`,
          data:singleproject
        })
    } catch (error) {
        res.status(409).json({Error:`project ${projectid} not found`})
    }
}

const getAllproject =  async(req,res)=>{
    try {
        const projects = await projectsModel.find().sort({time:-1})
        res.status(200).json({
          message:"projects fetched succesfully",
          data:projects
    
        })
      } catch (error) {
        res.status(409).json({Error:`Unable to fetch projects`})
        
      }
    
}

const updateproject = async(req,res)=>{
    const projectid = req.params.id;
    const token = req.headers.authorization.split(' ')[1]; 
   
    const user = jwt.verify(token,secerete); 
    if (user.user.role != 'admin') {
      return res.status(401).json({Error:"Access denied,you need to login as admin"})
    }else{

      try {
        const singleproject = await projectsModel.findByIdAndUpdate(projectid,{
          ...req.body
        })
        res.status(200).json({
          message:`project ${projectid} updated succesfully`,
          data:singleproject
        })
      } catch (error) {
        res.status(409).json({Error:`Unable to update project, project ${projectid} not found`})
    }
  } 
}

const deleteproject =async(req,res)=>{ 
  const projectid = req.params.id
  const token = req.headers.authorization.split(' ')[1]; 
 
  const user = jwt.verify(token,secerete); 
  if (user.user.role != 'admin') {
    return res.status(401).json({Error:"Access denied,you need to login as admin"})
  }else{

    try {
      const singleproject = await projectsModel.findByIdAndDelete(projectid)
      res.status(200).json({
        message:`project ${projectid} deleted succesfully`,
      })
    } catch (error) {
      res.status(409).json({Error:`Unable to delete project`})
    }
  }
}
const deleteallprojects =async(req,res)=>{ 
  const token = req.headers.authorization.split(' ')[1]; 
 
  const user = jwt.verify(token,secerete); 
  if (user.user.role != 'admin') {
    return res.status(401).json({Error:"Access denied,you need to login as admin"})
  }else{
    try {
      const allproject = await projectsModel.deleteMany()
      res.status(200).json({
        message:`projects deleted succesfully`,
        data:allproject
      })
    } catch (error) {
      res.status(409).json({Error:`Unable to delete projects`,error})
    }
  }
}

export {createproject,readproject,getAllproject,updateproject,deleteproject,deleteallprojects}