import userModel from "../models/userModel.js";

export const userController = async (req, res) => {
  try {
    const userId = req.user._id;
    const currentUser = await userModel.findOne({ _id: userId });

    const numberOfFollowers = currentUser.followers.length;
    const numberOfFollowing = currentUser.following.length;

    return res.status(200).send({
        success: true,
        message: "Successfully retrieved the user details",
        user : {
            "User Name" : currentUser.name,
            "No. of followers" : numberOfFollowers,
            "No. of following" : numberOfFollowing,
        }
    })
  } catch (err) {
    res.status(500).send({
      success: false,
      message: err.message,
    });
  }
};
