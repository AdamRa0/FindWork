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

module.exports = {
  signupUser,
  signinUser,
  createJob,
  updateJob,
  deleteJob,
  createBid,
  updateBid,
  deleteBid,
};
