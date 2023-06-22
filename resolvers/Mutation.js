const { signupUser, signinUser } = require("../mutations/authMutations");

const { createJob, updateJob } = require("../mutations/jobMutations");

module.exports = {
  signupUser,
  signinUser,
  createJob,
  updateJob,
};
