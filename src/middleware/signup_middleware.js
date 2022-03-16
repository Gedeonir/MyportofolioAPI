import userModel from "../schemas/userSchema.js"


const signupValidator = async(req,res,next)=>{
    if(!req.body.firstname) return res.json({Error:"Firstname can not be empty"})
    if(!req.body.lastname) return res.json({Error:"Lastname can not be empty"})
    if(!req.body.contact) return res.json({Error:"contact can not be empty"})
    if(!req.body.email) return res.json({Error:"email can not be empty"})
    if (!req.body.email.includes('@')) return res.json({Error:"invalid email"})
    if(!req.body.contact) return res.json({Error:"contact can not be empty"})
    if(!req.body.password) return res.json({Error:"password can not be empty"}) 
    if(!req.body.username) return res.json({Error:"username can not be empty"})
    if(!req.body.gender) return res.json({Error:"gender can not be empty"}) 
    const data = req.body;
    const user = await userModel.findOne({email: data.email});
    if(user) return res.status(400).json({Error:`${data.email} already exists`})

    next() 
} 

export {signupValidator as default}