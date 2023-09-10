import express from "express";
import { isSignedIn } from "../middlewares/authMiddleware.js";
import { deletePostController, newPostController } from "../controllers/postController.js";

const router = express.Router();

router.post('/post/new-post', isSignedIn, newPostController);
router.delete('/post/:id', isSignedIn, deletePostController);

export default router;