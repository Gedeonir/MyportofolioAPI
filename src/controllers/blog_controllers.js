import blogsModel from "../schemas/blogsSchema.js"
import jwt from 'jsonwebtoken'
import config from '../../config.js'

const {secret} = config 

const createBlog = async(req,res)=>{
  const token = req.headers.authorization.split(' ')[1];  
  
  const user = jwt.verify(token,secret); 
  if (user.user.role != 'admin') {
    return res.status(401).json({Error:"Access denied,you need to login as admin"})
  }else{
    try {
        const result= await blogsModel.create({
            title:req.body.title,
            body:req.body.body,
            likes: 0,
            comments:0,  
            author:user.user.firstname +' '+user.user.lastname,
            status:"",
            time:Date.now()
        })
        res.status(201).json({
            message:'article created succesfully',
            data:result,
        })
    } catch (error) {
        res.status(409).json({Error:`unable to create article`})
    } 
  }
}

const readBlog = async(req,res)=>{
    const blogid = req.params.id;

    try {
        const singleBlog = await blogsModel.findById(blogid)
        res.status(200).json({
          message:`blog ${blogid} fetched succesfully`,
          data:singleBlog
        }) 
        
       
    } catch (error) {
        res.status(409).json({Error:`blog ${blogid} not found`})
    }
}

const getAllblog =  async(req,res)=>{
    try {
        const blogs = await blogsModel.find().sort({time:-1})
        res.status(200).json(
          blogs
        )
      } catch (error) {
        res.status(409).json({Error:`Unable to fetch blogs`})
        
      }
    
}

const updateBlog = async(req,res)=>{
  const blogid = req.params.id;

  const token = req.headers['authorization'].split(' ')[1];

  const user =jwt.verify(token,secret)
  if (user.user.role != 'admin') { 
    return res.status(401).json({Error:"Access denied,you need to login as admin"})
  }else{

    try {
        const blogUpdate = await blogsModel.findById(blogid).update({title:req.body.title,body:req.body.body})
        const singleBlog = await blogsModel.findById(blogid)
        if (!singleBlog) {
          res.status(409).json({
            message:`blog with ${blogid} id not found`,
          })
          
        }else{
          res.status(200).json({
            message:`blog ${blogid} updated succesfully`,
            data:singleBlog
          })
        }
    } catch (error) {
      res.status(409).json({Error:`Unable to update blog, blog ${blogid} not found`})
    }
  }
}   

const deleteBlog =async(req,res)=>{ 

  const blogid = req.params.id
  const token = req.headers.authorization.split(' ')[1]; 

  const user = jwt.verify(token,secret); 
  if (user.user.role != 'admin') {
    return res.status(401).json({Error:"Access denied,you need to login as admin"})
  }else{ 
    try {   
      const singleBlog = await blogsModel.findByIdAndDelete(blogid);
      if (!singleBlog) {
        res.status(409).json({
          message:`blog with ${blogid} id not found`, 
        })
      } else{
        res.status(200).json({
          message:`blog ${blogid} deleted succesfully`, 
        }) 
      }
    } catch (error) {
      res.status(409).json({Error:`Unable to delete blog`,error})
    }
  }
}
const deleteallBlogs =async(req,res)=>{ 
  const token = req.headers.authorization.split(' ')[1];


  const user = jwt.verify(token,secret); 
  if (user.user.role != 'admin') {
    return res.status(401).json({Error:"Access denied,you need to login as admin"})
  }else{
  try {
    const allBlog = await blogsModel.deleteMany()
    if (!allBlog) {
      res.status(200).json({
        message:`blogs storage is already empty!`,
      })
    }else{
      res.status(200).json({
        message:`blogs deleted succesfully`,
        data:allBlog
      })
    }
  } catch (error) {
    res.status(409).json({Error:`Unable to delete blogs`,error})
  }
}
}

export {createBlog,readBlog,getAllblog,updateBlog,deleteBlog,deleteallBlogs}