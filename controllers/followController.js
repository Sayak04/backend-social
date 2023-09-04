import userModel from "../models/userModel.js";

export const followController = async (req, res) => {
  try {
    const userId = req.params.id;
    const currentUser = await userModel.findOne({ _id: req.user._id });
    
    // check if the user is trying to follow himself or herself or not
    if(userId === currentUser._id.toString()) {
      return res.status(403).send({
        success: false,
        message: "You are trying to follow yourself... :(",
      })
    }

    // check if the id provided is valid
    // i.e user with the current id exists or not
    const toBeFollowedUser = await userModel.findOne({ _id: userId });
    if (!toBeFollowedUser) {
      return res.status(404).send({
        success: false,
        message: `User with id ${userId} does not exist`,
      });
    }

    // check if the current user is already following toBeFollowedUser or not
    const followersWithSameId = toBeFollowedUser.followers.filter(
      (follower) => {
        return follower.user.toString() === currentUser._id.toString()
      }
    );
    if(followersWithSameId.length > 0) {
      return res.status(403).send({
        success: false,
        message: "You already follow this user",
      })
    }

    // else follow the user
    // add the user to follower list of toBeFollowedUser
    // add the toBeFollowedUser to follower list of currentUser
    toBeFollowedUser.followers.push({ user: currentUser._id });
    toBeFollowedUser.save();

    currentUser.following.push({ user: toBeFollowedUser._id });
    currentUser.save();

    return res.status(200).send({
      success: true,
      message: `User ${currentUser.name} successfully followed user ${toBeFollowedUser.name}`,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: "Unknow error",
      err,
    })
  }
};

