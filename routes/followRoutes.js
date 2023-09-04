import express from 'express';
import { isSignedIn } from '../middlewares/authMiddleware.js';
import { followController } from '../controllers/followController.js';
import { unfollowController } from '../controllers/unfollowController.js';

const router = express.Router();

router.post('/follow/:id', isSignedIn, followController);
router.post('/unfollow/:id', isSignedIn, unfollowController);

export default router;