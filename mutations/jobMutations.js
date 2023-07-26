const {
  createJobController,
  updateJobContoller,
  deleteJobController,
} = require("../controllers/jobController");

const { GraphQLError } = require("graphql");

exports.createJob = function (_, args, { credentials }) {
  //TODO: If user acccessing this resolver isn't employee, return error
  const { description, experience, availability, languages, jobPoster } = args;

  if (credentials !== "Employer") {
    throw new GraphQLError("You are not authorized to create a job", {
      extensions: {
        code: "FORBIDDEN",
      },
    });
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
    throw new GraphQLError("You are not authorized to update a job", {
      extensions: {
        code: "FORBIDDEN",
      },
    });
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

  if (credentials !== "Employer") {
    throw new GraphQLError("You are not authorized to delete a job", {
      extensions: {
        code: "FORBIDDEN",
      },
    });
  }

  return deleteJobController({ id: id });
};
