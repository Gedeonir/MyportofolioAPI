const messageValidator = (req,res,next)=>{
    if(!req.body.firstname) return res.json({Error:"Firstname can not be empty"})
    if(!req.body.lastname) return res.json({Error:"Lastname can not be empty"})
    if(!req.body.message) return res.json({Error:"message can not be empty"})
    if(!req.body.email) return res.json({Error:"email can not be empty"})
    if (!req.body.email.includes('@')) return res.json({Error:"invalid email"})
    next()
}

export {messageValidator as default}