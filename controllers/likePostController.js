import postModel from "../models/postModel.js";
import userModel from "../models/userModel.js";

export const likePostController = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await postModel.findById(postId);
    const currentUser = await userModel.findOne({ _id: req.user._id });

    // check if it is a valid post
    if (!post) {
      return res.status(404).send({
        success: false,
        message: `Post with id ${postId} is not a valid post`,
      });
    }

    // check if the current user has already liked the post or not
    const usersWithSameId = post.likedBy.filter((user) => {
      return user._id.toString() === currentUser._id.toString();
    });
    if (usersWithSameId.length > 0) {
      return res.status(403).send({
        success: false,
        message: "You have already liked the post",
      });
    }

    // add the userId to the liked users list
    post.likedBy.push(currentUser._id);
    post.save();

    return res.status(200).send({
      success: true,
      message: `You've successfully liked the post`,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: err.message,
    });
  }
};

