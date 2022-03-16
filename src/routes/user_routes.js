import express from "express";
import {login,getAllUsers,createUser,getOneUser,updateUser,deleteUser,deleteallUsers} from "../controllers/user_controllers.js"
import signupValidator from "../middleware/signup_middleware.js"
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();


router.get('/users',verifyToken,getAllUsers);

router.post('/users/newUser',signupValidator, createUser);

router.get('/users/:id', verifyToken,getOneUser);
router.put('/users/update/:id',verifyToken,updateUser);

router.delete('/users/delete/:id',verifyToken,deleteUser);
router.delete('/users/deleteallusers/',verifyToken,deleteallUsers);
router.post('/login',login)

export {router as default};