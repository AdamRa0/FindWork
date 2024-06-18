const UserModel = require("../models/userModel");

exports.banUserController = async function ({ userID }) {
    try {
    await UserModel.findOneAndUpdate(
      { _id: userID },
      { banned: true },
      { new: true }
    );
  } catch (error) {
    return `Could not ban user with ID: ${userID}`;
  }

  return `User successfully banned`;
};
