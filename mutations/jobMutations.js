const { createJobController } = require("../controllers/jobController");

exports.createJob = function (_, args) {
  const { description, experience, availability, languages } = args;

  return createJobController({
    description: description,
    experience: experience,
    availability: availability,
    languages: languages
  });
};
