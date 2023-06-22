const { fetchJobsController } = require("../controllers/jobController");

exports.fetchJobs = function (_, _) {
  return fetchJobsController();
};
