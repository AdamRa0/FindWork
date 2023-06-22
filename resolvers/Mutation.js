const { signupUser, signinUser } = require("../mutations/authMutations");

const { createJob } = require("../mutations/jobMutations");

module.exports = {
  signupUser,
  signinUser,
  createJob,
};
