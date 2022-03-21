import express from "express";
import {createBlog, readBlog,getAllblog,updateBlog,deleteBlog,deleteallBlogs} from "../controllers/blog_controllers.js"
import { verifyToken } from "../middleware/auth.js";
import blogValidator from "../middleware/blog_middleware.js"

const router = express.Router()

router.post('/blogs/createBlog',verifyToken,createBlog);
router.get('/blogs', getAllblog);
router.get('/blogs/:id',readBlog);
router.put('/blogs/updateblog/:id', verifyToken,updateBlog);
router.delete('/blogs/deleteblog/:id',verifyToken,deleteBlog);


export{router as default} 