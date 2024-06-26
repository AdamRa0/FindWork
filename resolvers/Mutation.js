const { signupUser, signinUser } = require("../mutations/authMutations");

const {
  createJob,
  updateJob,
  deleteJob,
} = require("../mutations/jobMutations");

const {
  createBid,
  updateBid,
  deleteBid,
} = require("../mutations/bidMutations");

const {
  createReview,
  updateReview,
  deleteReview,
} = require("../mutations/reviewMutations");

const {
  banUser
} = require("../mutations/userMutations");

module.exports = {
  signupUser,
  signinUser,
  createJob,
  updateJob,
  deleteJob,
  createBid,
  updateBid,
  deleteBid,
  createReview,
  updateReview,
  deleteReview,
  banUser,
};
