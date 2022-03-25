import userModel from "../schemas/userSchema.js"
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import config from '../../config.js'

const {secret} = config 

const homepage =async (req,res)=>{
  const token = await req.headers['authorization'].split(' ')[1];

  const user =jwt.verify(token,secret);
  if (user.user.role != 'admin') { 
    return res.status(401).json({Error:"Access denied,you need to login as admin"})
  }else{ 
    res.status(200).json({message:'hey welcome to my API',user:user})
  } 
}


const createUser =async(req,res)=>{
  let responseObject;
  const user = req.body;
  bcrypt.hash(user.password,10,(err,hash) =>{
    if (err) {
      responseObject={Error:"Internal error"}      
    } else {
      user.password = hash
      try {
        const result= userModel.create({
          firstname:req.body.firstname,
          lastname:req.body.lastname,
          contact: req.body.contact,
          email:req.body.email,  
          password:user.password,
          gender:req.body.gender,
          username:req.body.username,
          role:req.body.role,
          
          time:Date.now()
        })
        res.status(201).json({
          message:'user  created succesfully',
          data:result,
        })
      } catch (error) {
      res.status(409).json({Error:`unable to create user`})
    } 
      
  }
  })
   
}

const login = async(req,res)=>{
  let responseObject,status;  
 

  const user = await userModel.findOne({email:req.body.email}).select('+password').exec();
  if (!user) {
    return res.status(400).json({Error:"invalid email or password"})
  }
  bcrypt.compare(req.body.password,user.password, (err,verified)=>{
    if(err){
      responseObject = {Error:"internal Error"};
      status=500;
    }
    if (verified) {
      const token = jwt.sign({user:user},secret, { expiresIn: 60*60});
      responseObject = {message:`Welcome ${user.firstname} ${user.lastname}`,token};
      status=200;
    } else {
      responseObject = {Error:'invalid email or password'};
      status= 400;
    }
    res.status(status).json(responseObject);
  })
}


const getOneUser = async(req,res)=>{
  const Userid = req.params.id;

  const token = await req.headers['authorization'].split(' ')[1];

  const user =jwt.verify(token,secret)
  if (user.user.role != 'admin') { 
    return res.status(401).json({Error:"Access denied,you need to login as admin"})
  }else{
    try {
      const singleUser = await userModel.findById(Userid)
      res.status(200).json({
        message:`User ${Userid} fetched succesfully`,
        data:singleUser
      })
    } catch (error) {
        res.status(409).json({Error:`User ${Userid} not found`})
      }
  }
} 
 
const getAllUsers =  async(req,res)=>{
  const token = await req.headers['authorization'].split(' ')[1];

  const user =jwt.verify(token,secret)
  if (user.user.role != 'admin') { 
    return res.status(401).json({Error:"Access denied,you need to login as admin"})
  }else{
 
    try {
      const Users = await userModel.find().sort({time:-1})
      res.status(200).json({
        message:"Users fetched succesfully",
        data:Users
  
      })
    } catch (error) {
      res.status(409).json({Error:`Unable to fetch Users`})
      
    }
  }
    
}

const updateUser = async(req,res)=>{
  const Userid = req.params.id;

  const token = await req.headers['authorization'].split(' ')[1];

  const user =jwt.verify(token,secret)
  if (user.user.role != 'admin') { 
    return res.status(401).json({Error:"Access denied,you need to login as admin"})
  }else{

    try {
        const singleUser = await userModel.findByIdAndUpdate(Userid,{
          ...req.body
        })
        res.status(200).json({
          message:`User ${Userid} updated succesfully`,
          data:singleUser
        })
    } catch (error) {
      res.status(409).json({Error:`Unable to update User, User ${Userid} not found`})
    }
  }
}   

const deleteUser =async(req,res)=>{ 

  const Userid = req.params.id
  const token = req.headers.authorization.split(' ')[1];

  const user = jwt.verify(token,secret); 
  if (user.user.role != 'admin') {
    return res.status(401).json({Error:"Access denied,you need to login as admin"})
  }else{
    try {
      const singleUser = await userModel.findByIdAndDelete(Userid)
      res.status(200).json({
        message:`User ${Userid} deleted succesfully`,
      })
    } catch (error) {
      res.status(409).json({Error:`Unable to delete User`,error})
    }
  }
}


export {homepage,createUser,login,getOneUser,getAllUsers,updateUser,deleteUser}