import postModel from "../models/postModel.js";
import userModel from "../models/userModel.js";

export const newPostController = async (req, res) => {
  try {
    const userId = req.user._id;
    const currentUser = await userModel.findOne({ _id: userId });

    // if the user is not logged in
    if (!currentUser) {
      return res.status(404).send({
        success: false,
        message: "User not found, please login",
      });
    }

    // get the post details and validate them
    const { title, description } = req.body;
    if (!title || !description) {
      return res.status(404).send({
        success: false,
        message: "Please provide the title and description",
      });
    }

    // create a new post
    const newPost = new postModel({ title, description, author: userId });
    const isPostCreated = await newPost.save();
    if (!isPostCreated) {
      res.status(500).send({
        success: false,
        message: "Post creation failed",
      });
    }

    // Add the post to the user's posts array
    currentUser.posts.push(newPost);
    const isPostAdded = await currentUser.save();
    if (!isPostAdded) {
      res.status(500).send({
        success: false,
        message: "Post addition failed",
      });
    }

    res.status(200).send({
      success: true,
      message: "Post created and added successfully",
      post: {
        id: newPost._id,
        title: newPost.title,
        description: newPost.description,
        created_at: newPost.createdAt,
      },
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: err.message,
    });
  }
};

export const deletePostController = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await postModel.findOne({ _id: postId });

    // if the post doesn't exist
    if (!post) {
      return res.status(404).send({
        success: false,
        message: `Post with ${postId} does not exist`,
      });
    }

    const authorIdOfPost = post.author;

    const userId = req.user._id;
    const currentUser = await userModel.findOne({ _id: userId });

    // if the logged in user is not the author, send 403 can't delete the post
    if (authorIdOfPost.toString() !== userId) {
      return res.status(403).send({
        success: false,
        message: "You are not allowed to delete other users' posts.",
      });
    }

    // else delete the post from postModel and also from user posts array in userModel
    const isDelFromPostModel = await postModel.deleteOne({ _id: postId });
    if (!isDelFromPostModel) {
      return res.status(500).send({
        success: false,
        message: "Couldn't delete post...",
      });
    }

    const newPosts = currentUser.posts.filter((p) => {
      return p.toString() !== postId;
    });
    currentUser.posts = newPosts;
    currentUser.save();

    return res.status(200).send({
      success: true,
      message: "Post deleted successfully",
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      err: err.message,
    });
  }
};


export const postDetailsController = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await postModel.findById(postId);
    if(!post) {
      return res.status(404).send({
        success: false,
        message: 'No such post found'
      })
    };
    return res.status(200).send({
      success: true,
      post : {
        id: post._id,
        title: post.title,
        description: post.description,
        'Number of likes' : post.likedBy.length,
        'Number of comments': post.comments.length,
      }
    })
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: err.message,
    });
  }
}