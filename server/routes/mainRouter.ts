import express from 'express'
import authRouter from './authRouter.js';
import messageRouter from './messageRouter.js';

const router = express.Router()

router.use('/auth',authRouter)
router.use('/message',messageRouter)

export default router;