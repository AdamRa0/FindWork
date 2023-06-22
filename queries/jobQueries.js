const {
  fetchJobsController,
  fetchJobController,
} = require("../controllers/jobController");

exports.fetchJobs = function (_, _) {
  return fetchJobsController();
};

exports.fetchJob = function (_, args) {
  const { id } = args;

  return fetchJobController({ id: id });
};
