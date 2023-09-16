import express from "express";
import { isSignedIn } from "../middlewares/authMiddleware.js";
import {
  allPostsDetailsController,
  deletePostController,
  newPostController,
  postDetailsController,
} from "../controllers/postController.js";

const router = express.Router();

// single post details
router.get("/post/:id", postDetailsController);
// all posts details
router.get("/posts/all-posts", isSignedIn, allPostsDetailsController);
router.post("/post/new-post", isSignedIn, newPostController);
router.delete("/post/:id", isSignedIn, deletePostController);

export default router;
