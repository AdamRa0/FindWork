const UserModel = require("../models/userModel");

async function jobs(parent, _) {
  const userID = parent.id;

  const userJobs = await UserModel.findById(userID).populate({
    path: "jobs",
  });

  return userJobs;
}

async function bids(parent, _) {
  const userID = parent.id;

  const userBids = await UserModel.findById(userID).populate({ path: "bids" });

  return userBids;
}

async function reviews(parent, _) {
  const userID = parent.id;

  const userReviews = await UserModel.findById(userID).populate({
    path: "reviews",
  });

  return userReviews;
}

module.exports = {
  jobs,
  bids,
  reviews,
};
