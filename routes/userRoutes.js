import express from 'express';
import { isSignedIn } from '../middlewares/authMiddleware.js';
import { userController } from '../controllers/userController.js';

const router = express.Router();

router.get('/user', isSignedIn, userController);

export default router;