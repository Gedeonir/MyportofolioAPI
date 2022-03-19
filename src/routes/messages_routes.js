import express from "express";
import {createmessage, readmessage,getAllmessage,deletemessage,deleteallmessages} from "../controllers/message_controllers.js"
import { verifyToken } from "../middleware/auth.js";
import messagesValidator from "../middleware/messages_middleware.js"

const router = express.Router()

router.post('/messages/createmessage',createmessage);
router.get('/messages', verifyToken,getAllmessage);
router.get('/messages/:id',verifyToken,readmessage);
router.delete('/messages/deletemessage/:id',verifyToken,deletemessage);



export{router as default}