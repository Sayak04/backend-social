import express from "express";
import { likePostController, unlikePostController } from "../controllers/likePostController.js";
import { isSignedIn } from './../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/post/like/:id', isSignedIn, likePostController);
router.post('/post/unlike/:id', isSignedIn, unlikePostController);

export default router;