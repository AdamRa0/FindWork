const jobModel = require("../models/jobModel");

async function preferences(parent, _) {
  const jobID = parent.id;

  const { preferences } = await jobModel.findById(jobID);

  return preferences;
}

module.exports = {
  preferences,
};
