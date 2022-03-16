import express from "express";
import {createskill, readskill,getAllskill,updateskill,deleteskill,deleteallskills} from "../controllers/skill_controllers.js"
import { verifyToken } from "../middleware/auth.js";

const router = express.Router()

router.post('/skills/createskill',verifyToken,createskill);
router.get('/skills', getAllskill);
router.get('/skills/:id',readskill);
router.put('/skills/updateskill/:id',verifyToken,updateskill);
router.delete('/skills/deleteskill/:id',verifyToken,deleteskill);
router.delete('/skills/deleteallskills/',verifyToken,deleteallskills); 


export{router as default}