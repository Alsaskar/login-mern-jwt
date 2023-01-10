import express from 'express'
import { loggedInController, loginController, registerController } from '../controllers/authController'
import CekToken from '../middleware/CekToken'
const router = express.Router()

router.post('/login', loginController)
router.post('/register', registerController)
router.get('/', CekToken, loggedInController)

export default router