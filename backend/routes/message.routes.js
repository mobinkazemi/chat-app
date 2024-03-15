import express from 'express';
import { sendMessage, getMessages } from '../controllers/message.controller.js';
import authProtect from '../middlewares/authProtect.middleware.js';

const router = express.Router();

router.post('/send/:receiverId', authProtect, sendMessage);
router.get('/:receiverId', authProtect, getMessages);


export default router