import commentModel from "../schemas/CommentSchema.js"


const commentValidator = async(req,res,next)=>{
    if(!req.body.comment) return res.json({Error:"comment can not be empty"})
    const data = req.body;
    const comment = await commentModel.findOne({comment:data.comment});
    if(comment) return res.status(400).json({Error:`Duplicated comment`})
    next() 
} 

export {commentValidator as default} 