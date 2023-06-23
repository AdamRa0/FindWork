const { signupUser, signinUser } = require("../mutations/authMutations");

const {
  createJob,
  updateJob,
  deleteJob,
} = require("../mutations/jobMutations");

module.exports = {
  signupUser,
  signinUser,
  createJob,
  updateJob,
  deleteJob,
};
