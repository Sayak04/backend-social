import express from 'express';
import { isSignedIn } from '../middlewares/authMiddleware.js';
import { followController } from '../controllers/followController.js';

const router = express.Router();

router.post('/follow/:id', isSignedIn, followController);

export default router;