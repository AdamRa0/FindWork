const jobModel = require("../models/jobModel");
const userModel = require("../models/userModel");

exports.createJobController = async function ({
  description,
  experience,
  availability,
  languages,
  jobPoster,
}) {
  /**
   * Creates and returns the newly created job
   *
   * Arguments
   * ---------
   * description: Brief overview of required job
   * experience: Desired level of experience anyone interested should have
   * availability: How many hours a week anyone interested is available
   * languages: Desired languages anyone interested should be able to speak
   * jobPoster: ID of jobPoster
   */

  const preferencesObject = {
    availability: availability,
    experience: experience,
    languages: languages,
  };

  const job = await jobModel.create({
    description: description,
    preferences: preferencesObject,
    jobPoster: jobPoster,
  });

  const { jobs } = await userModel.findById(jobPoster);

  jobs.push(job._id);

  await userModel.updateOne(
    {
      _id: jobPoster,
    },
    { jobs: jobs }
  );

  return job;
};

exports.fetchJobsController = async function () {
  /**
   * Returns list of all jobs
   */

  const jobs = await jobModel.find();

  return jobs;
};

exports.fetchJobController = async function ({ id }) {
  /**
   * Returns a job with the id passed in argument
   *
   * Arguments
   * ---------
   * id: ID of desired job
   */

  const job = await jobModel.findOne({ _id: id });

  return job;
};

exports.updateJobContoller = async function ({
  /**
   * Updates and returns the newly updated job
   *
   * Arguments
   * ---------
   * description: Brief overview of required job
   * experience: Desired level of experience anyone interested should have
   * availability: How many hours a week anyone interested is available
   * languages: Desired languages anyone interested should be able to speak
   */

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

exports.deleteJobController = async function ({ id }) {
  /**
   * Deletes a job with the id passed in argument
   * Returns a message or error depending if job is deleted successfully
   *
   * Arguments
   * ---------
   * id: ID of desired job
   */

  const deleted = await jobModel.findOneAndDelete({ _id: id });

  const deletedJobPoster = deleted.jobPoster;

  await userModel.updateOne(
    { _id: deletedJobPoster },
    { $pull: { jobs: deleted._id } }
  );

  return deleted ? "Job was successfully deleted" : "Could not delete job";
};
