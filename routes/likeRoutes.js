import express from "express";
import { commentPostController, likePostController, unlikePostController } from "../controllers/likePostController.js";
import { isSignedIn } from './../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/post/like/:id', isSignedIn, likePostController);
router.post('/post/unlike/:id', isSignedIn, unlikePostController);
router.post('/post/comment/:id', isSignedIn, commentPostController);

export default router;