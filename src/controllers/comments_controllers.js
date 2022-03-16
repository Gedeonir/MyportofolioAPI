import blogs from "../schemas/blogsSchema.js"
import commentModel from "../schemas/CommentSchema.js"
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'


dotenv.config()

const secerete = process.env.JWT_SECRET


const createcomment = async(req,res)=>{
  const blogid =req.params.blogid
  const token = req.headers.authorization.split(' ')[1]; 
 
  const user = jwt.verify(token,secerete); 
  if (user) {
    try {
      const blog = await blogs.findById(blogid)
      const result= await commentModel.create({
          blogid:blogid,
          email:user.user.email,
          names:user.user.firstname +' '+user.user.lastname,
          comment:req.body.comment,
          time:Date.now() 
      })       
      res.status(201).json({
        message:'comment sent',  
        comment:result,

      })
      const blogCommentsCount = await commentModel.find({blogid:blogid}).count()
      const updateBlog = await blogs.find({blogid:blogid}).update({comments:blogCommentsCount})
      console.log(blogCommentsCount,updateBlog)
    } catch (error) {
      res.status(409).json({Error:`unable to send comment, blog may have been deleted`}) 
    } 
   
  }else{
    res.status(409).json({Error:`Invalid token`}) 
  }
 
}

const getAllblogcomment =  async(req,res)=>{
  const blogid =req.params.blogid
  let responseObject,status
  const blog = await blogs.findById(blogid)
  const blogCommentsCount = await commentModel.find({blogid:blogid}).count()
    try {
        const comments = await commentModel.find({blogid: blogid}).sort({time:-1})

        status=201
        responseObject={
          message:`${blogid} comments fetched succesfully`,
          commentsCount:blogCommentsCount,
          comments:comments,
          blog:blog,
          
        }
      } catch (error) {
        status = 409
        responseObject={Error:`Unable to fetch comments`}        
      }
      res.status(status).json({responseObject})
    
}

const updatecomment = async(req,res)=>{
  const token = req.headers.authorization.split(' ')[1]; 
 
  const user = jwt.verify(token,secerete); 
  if (user) {
 
    const blogid = req.params.blogid
    
    const comments = await commentModel.findOne({blogid: blogid}).sort({time:-1})
    if (comments) {
      const commentid = req.params.id;
      try {
      const singlecomment = await commentModel.findByIdAndUpdate(commentid,{
        ...req.body
      })
      res.status(200).json({
        message:`comment ${commentid} updated succesfully`,
        comments:singlecomment
      })
      } catch (error) {
        res.status(409).json({Error:`Unable to update comment, comment ${commentid} not found`})
      }
    }else{
      res.status(409).json({Error:`Unable to update comment, blog ${blogid} not found`})
    }
  }

   
}

const deletecomment =async(req,res)=>{ 
  const blogid = req.params.blogid
  const token = req.headers.authorization.split(' ')[1]; 
 
  const user = jwt.verify(token,secerete); 
  if (user) {

    const comments = await commentModel.findOne({blogid: blogid}).sort({time:-1})
    if (comments) { 
        const commentid = req.params.id
      try {
        const singlecomment = await commentModel.findByIdAndDelete(commentid)
        if (!singlecomment) {
          res.status(409).json({
            message:`comment ${commentid} does not exists`,
          })
        }else{
          res.status(200).json({
            message:`comment ${commentid} deleted succesfully`,
          })
          const blogCommentsCount = await commentModel.find({blogid:blogid}).count()
          const updateBlog = await blogs.find({blogid:blogid}).update({comments:blogCommentsCount})
          console.log(blogCommentsCount,updateBlog)
        }
      } catch (error) {
        res.status(409).json({Error:`Unable to delete comment`,error})
      }
    }else{
      res.status(409).json({Error:`Unable to delete comment, blog ${blogid} not found`})
    }
  }
}
const deleteallcomments =async(req,res)=>{ 
  const blogid = req.params.blogid

  const token = req.headers.authorization.split(' ')[1]; 
 
  const user = jwt.verify(token,secerete); 
  if (user.user.role !='admin') {
    return res.status(401).json({Error:"Access denied,you need to login as admin"})
  }else{
    const comments = await commentModel.findOne({blogid: blogid}).sort({time:-1})
    if (comments) {
      try {
        const allcomment = await commentModel.deleteMany()
        res.status(200).json({
          message:`comments deleted succesfully`,
          data:allcomment
        })
      } catch (error) {
        res.status(409).json({Error:`Unable to delete comments`,error})
      }
    }else{
      res.status(409).json({Error:`Unable to delete comments, blog ${blogid} not found`})
    }
  } 
  
}



export {createcomment,getAllblogcomment,updatecomment,deletecomment,deleteallcomments}