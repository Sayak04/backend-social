import express from 'express';
import { loginController, registerController, testController } from '../controllers/authController.js';
import { isSignedIn } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register', registerController);
router.post('/login', loginController);

router.get('/test', isSignedIn, testController);

export default router;