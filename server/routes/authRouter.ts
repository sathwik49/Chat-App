import express from 'express'
import { getMe, userLogin, userLogout, userSignup } from '../controllers/authController.js'
import { validateUser } from '../middleware/validateUser.js'

const router = express.Router()


router.post('/signup',userSignup)
router.post('/login',userLogin)
router.post('/logout',userLogout)
router.get('/me',validateUser,getMe)

export default router;