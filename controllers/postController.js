import postModel from "../models/postModel.js";
import userModel from "../models/userModel.js";

export const newPostController = async (req, res) => {
  try {
    const userId = req.user._id;
    const currentUser = await userModel.findOne({ _id: userId });

    // if the user is not logged in
    if(!currentUser) {
        return res.status(404).send({
            success: false,
            message: "User not found, please login",
        })
    }

    // get the post details and validate them
    const { title, description } = req.body;
    if(!title || !description) {
        return res.status(404).send({
            success: false,
            message: "Please provide the title and description",
        })
    }

    // create a new post
    const newPost = new postModel({ title, description, author: userId });
    const isPostCreated = await newPost.save();
    if(!isPostCreated) {
        res.status(500).send({
            success: false,
            message: "Post creation failed",
        })
    }

    // Add the post to the user's posts array
    currentUser.posts.push(newPost)
    const isPostAdded = await currentUser.save();
    if(!isPostAdded) {
        res.status(500).send({
            success: false,
            message: "Post addition failed",
        })
    }

    res.status(200).send({
        success: true,
        message: "Post created and added successfully",
        post: {
            id: newPost._id,
            title: newPost.title,
            description: newPost.description,
            created_at: newPost.createdAt,
        }
    })
  } catch (err) {
    res.status(500).send({
      success: false,
      message: err.message,
    });
  }
};