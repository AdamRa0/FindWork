const { fetchJobs, fetchJob } = require("../queries/jobQueries");

const { fetchBids, fetchBid } = require("../queries/bidQueries");

const { fetchReviews, fetchReview } = require("../queries/reviewQueries");

module.exports = {
  fetchJobs,
  fetchJob,
  fetchBids,
  fetchBid,
  fetchReviews,
  fetchReview,
};
