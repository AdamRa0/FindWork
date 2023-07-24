const JobModel = require("../models/jobModel");

async function preferences(parent, _) {
  const jobID = parent.id;

  const { preferences } = await JobModel.findById(jobID);

  return preferences;
}

async function jobPoster(parent, _) {
  const jobID = parent.id;

  const { jobPoster } = await JobModel.findById(jobID).populate({
    path: "jobPoster",
  });

  return jobPoster;
}

async function bids(parent, _) {
  const jobID = parent.id;

  const jobBids = await JobModel.findById(jobID).populate({ path: "bids" });

  return jobBids;
}

module.exports = {
  preferences,
  jobPoster,
  bids,
};
