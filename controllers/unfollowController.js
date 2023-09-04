import userModel from "../models/userModel.js";

export const unfollowController = async (req, res) => {
  try {
    const userId = req.params.id;
    const currentUser = await userModel.findOne({ _id: req.user._id });

    // check if the id provided is valid
    // i.e user with the requested id exists or not
    const toBeUnfollowedUser = await userModel.findOne({ _id: userId });
    if (!toBeUnfollowedUser) {
      return res.status(404).send({
        success: false,
        message: `User with id ${userId} does not exist`,
      });
    }

    // check if the current user is following the toBeUnfollowed user or not
    const followerWithId = toBeUnfollowedUser.followers.filter((follower) => {
      return follower.user.toString() === currentUser._id.toString();
    });
    if (followerWithId.length == 0) {
      return res.status(403).send({
        success: false,
        message: "You dont follow this user...",
      });
    }

    // unfollow the user
    currentUser.following = currentUser.following.filter((id) => {
      id.user.toString() !== toBeUnfollowedUser._id.toString();
    });
    currentUser.save();

    // remove the current user from that users followers list
    toBeUnfollowedUser.followers = toBeUnfollowedUser.followers.filter((id) => {
      id.user.toString() !== currentUser._id.toString();
    });
    toBeUnfollowedUser.save();

    return res.status(200).send({
      success: true,
      message: `User ${currentUser.name} successfully unfollowed ${toBeUnfollowedUser.name}`,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: "Unknown error",
      err,
    });
  }
};
