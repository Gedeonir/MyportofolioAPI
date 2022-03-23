import express from "express";
import {createcomment,getAllblogcomment,updatecomment,deletecomment,deleteallcomments} from "../controllers/comments_controllers.js"
import { verifyToken } from "../middleware/auth.js";
import commentValidator from "../middleware/comments_middleware.js"
const router = express.Router() 

router.post('/blogs/:blogid/sendcomment',verifyToken, commentValidator,createcomment);
router.get('/blogs/:blogid/comments', getAllblogcomment);
router.put('/blogs/:blogid/updatecomment/:id',verifyToken,updatecomment);
router.delete('/blogs/:blogid/deletecomment/:id',verifyToken,deletecomment);

export{router as default}  