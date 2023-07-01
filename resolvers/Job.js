const jobModel = require("../models/jobModel");

async function preferences(parent, _) {
  const jobID = parent.id;

  const { preferences } = await jobModel.findById(jobID);

  return preferences;
}

async function jobPoster(parent, _) {
  const jobID = parent.id;

  const { jobPoster } = await jobModel.findById(jobID).populate({
    path: "jobPoster",
  });

  return jobPoster;
}

async function bids(parent, _) {
  const jobID = parent.id;

  const jobBids = await jobModel.findById(jobID).populate({ path: "bids" });

  return jobBids;
}

module.exports = {
  preferences,
  jobPoster,
  bids,
};
