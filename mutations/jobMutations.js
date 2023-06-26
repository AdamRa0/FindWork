const {
  createJobController,
  updateJobContoller,
  deleteJobController,
} = require("../controllers/jobController");

exports.createJob = function (_, args) {
  //TODO: If user acccessing this resolver isn't employee, return error
  const { description, experience, availability, languages, jobPoster } = args;

  return createJobController({
    description: description,
    experience: experience,
    availability: availability,
    languages: languages,
    jobPoster: jobPoster,
  });
};

exports.updateJob = function (_, args) {
  //TODO: If user acccessing this resolver isn't employee, return error
  const { id, description, experience, availability, languages } = args;

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

  return deleteJobController({ id: id });
};
