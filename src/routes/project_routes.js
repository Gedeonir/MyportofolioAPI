import express from "express";
import {createproject, readproject,getAllproject,updateproject,deleteproject,deleteallprojects} from "../controllers/project_controllers.js"
import { verifyToken } from "../middleware/auth.js";

const router = express.Router()

router.post('/projects/createproject',verifyToken,createproject);
router.get('/projects', getAllproject);
router.get('/projects/:id',readproject);
router.put('/projects/updateproject/:id',verifyToken,updateproject);
router.delete('/projects/deleteproject/:id',verifyToken,deleteproject);



export{router as default}