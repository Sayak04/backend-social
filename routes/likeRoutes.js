import express from "express";
import { likePostController } from "../controllers/likePostController.js";
import { isSignedIn } from './../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/post/like/:id', isSignedIn, likePostController);

export default router;