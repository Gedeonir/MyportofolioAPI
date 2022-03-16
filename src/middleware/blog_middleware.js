import blogModel from "../schemas/blogsSchema.js"


const blogValidator = async(req,res,next)=>{
    if(!req.body.title) return res.json({Error:"title can not be empty"})
    if(!req.body.body) return res.json({Error:"body can not be empty"})
    const data = req.body.title;
    const blog = await blogModel.findOne({title: data});
    if(blog) return res.status(400).json({Error:`Duplicated blogs`})
    next() 
} 

export {blogValidator as default}