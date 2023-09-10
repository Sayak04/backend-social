import postModel from "../models/postModel.js";
import userModel from "../models/userModel.js";

export const userController = async (req, res) => {
  try {
    const userId = req.user._id;
    const currentUser = await userModel.findOne({ _id: userId });

    const numberOfFollowers = currentUser.followers.length;
    const numberOfFollowing = currentUser.following.length;
    const numberOfPosts = currentUser.posts.length;

    const posts = await Promise.all(
      currentUser.posts.map(async (post) => {
        const getPost = await postModel.findOne({ _id: post._id });
        return getPost;
      })
    );

    return res.status(200).send({
      success: true,
      message: "Successfully retrieved the user details",
      user: {
        "User Name": currentUser.name,
        "No. of followers": numberOfFollowers,
        "No. of following": numberOfFollowing,
        "No. of posts": numberOfPosts,
        Posts: posts,
      },
    });;
  } catch (err) {
    res.status(500).send({
      success: false,
      message: err.message,
    });
  }
};
