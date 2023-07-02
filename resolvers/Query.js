const { fetchJobs, fetchJob } = require("../queries/jobQueries");

const { fetchBids, fetchBid } = require("../queries/bidQueries");

module.exports = {
  fetchJobs,
  fetchJob,
  fetchBids,
  fetchBid,
};
