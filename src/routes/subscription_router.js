import express from "express";
import {createsubscription, readsubscription,getAllsubscription,deletesubscription,deleteallsubscriptions} from "../controllers/subscriptions_controllers.js"
import { verifyToken } from "../middleware/auth.js";

const router = express.Router()

router.post('/subscriptions/createsubscription',createsubscription);
router.get('/subscriptions', verifyToken,getAllsubscription);
router.get('/subscriptions/:id',readsubscription);
router.delete('/subscriptions/deletesubscription/:id',deletesubscription);
router.delete('/subscriptions/deleteallsubscriptions',verifyToken,deleteallsubscriptions);



export{router as default}