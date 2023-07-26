const {
  createJobController,
  updateJobContoller,
  deleteJobController,
} = require("../controllers/jobController");

const { errorBuilder } = require("../utils/errorBuilder");

exports.createJob = function (_, args, { credentials }) {
  //TODO: If user acccessing this resolver isn't employee, return error
  const { description, experience, availability, languages, jobPoster } = args;

  if (credentials !== "Employer") {
    const error = errorBuilder({
      errorMessage: "You are not authorized to create a job",
      errorCode: "FORBIDDEN",
    });
    throw error;
  }

  return createJobController({
    description: description,
    experience: experience,
    availability: availability,
    languages: languages,
    jobPoster: jobPoster,
  });
};

exports.updateJob = function (_, args, { credentials }) {
  //TODO: If user acccessing this resolver isn't employee, return error
  const { id, description, experience, availability, languages } = args;

  if (credentials !== "Employer") {
    const error = errorBuilder({
      errorMessage: "You are not authorized to update a job",
      errorCode: "FORBIDDEN",
    });
    throw error;
  }

  return updateJobContoller({
    id: id,
    description: description,
    experience: experience,
    availability: availability,
    languages: languages,
  });
};

exports.deleteJob = function (_, args) {
  //TODO: If user acccessing this resolver isn't employee, return error
  const { id } = args;

  if (credentials !== "Employer" || credentials !== "Admin") {
    const error = errorBuilder({
      errorMessage: "You are not delete to create a job",
      errorCode: "FORBIDDEN",
    });
    throw error;
  }

  return deleteJobController({ id: id });
};
