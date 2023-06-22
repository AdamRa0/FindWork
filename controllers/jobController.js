const jobModel = require("../models/jobModel");

exports.createJobController = async function ({
  description,
  experience,
  availability,
  languages,
}) {
  console.log(languages);
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
