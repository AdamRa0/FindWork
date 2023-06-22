const jobModel = require("../models/jobModel");

exports.createJobController = async function ({
  description,
  experience,
  availability,
  languages,
}) {
  const preferencesObject = {
    availability: availability,
    experience: experience,
    languages: languages,
  };

  const job = await jobModel.create({
    description: description,
    preferences: preferencesObject,
  });

  return job;
};

exports.fetchJobsController = async function () {
  const jobs = await jobModel.find();

  return jobs;
};

exports.fetchJobController = async function ({ id }) {
  const job = await jobModel.findOne({ _id: id });

  return job;
};

exports.updateJobContoller = async function ({
  id,
  description,
  experience,
  availability,
  languages,
}) {
  const preferencesObject = {
    availability: availability,
    experience: experience,
    languages: languages,
  };

  const updatedJob = await jobModel.findOneAndUpdate(
    { _id: id },
    {
      description: description,
      preferences: preferencesObject,
    },
    { new: true }
  );

  return updatedJob;
};
