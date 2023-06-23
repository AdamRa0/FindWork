const {
  createJobController,
  updateJobContoller,
  deleteJobController,
} = require("../controllers/jobController");

exports.createJob = function (_, args) {
  const { description, experience, availability, languages } = args;

  return createJobController({
    description: description,
    experience: experience,
    availability: availability,
    languages: languages,
  });
};

exports.updateJob = function (_, args) {
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
  const { id } = args;

  return deleteJobController({ id: id });
}