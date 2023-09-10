import express from "express";
import { isSignedIn } from "../middlewares/authMiddleware.js";
import { newPostController } from "../controllers/postController.js";

const router = express.Router();

router.post('/post/new-post', isSignedIn, newPostController);

export default router;