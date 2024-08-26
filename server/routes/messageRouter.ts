import express from 'express'
import { getMessages, sendMessage } from '../controllers/messageController.js';
import { validateUser } from '../middleware/validateUser.js';

const router = express.Router();

router.post('/send/:id',validateUser,sendMessage)
router.get('/:id',validateUser,getMessages)

export default router;