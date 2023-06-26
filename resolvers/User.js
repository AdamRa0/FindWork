const mongoose = require("mongoose");
const userModel = require("../models/userModel");

async function jobs(parent, _) {
  const userID = parent.id;

  const userJobs = await userModel.findById(userID).populate({
    path: "jobs",
  });

  return userJobs;
}

module.exports = {
  jobs,
};
