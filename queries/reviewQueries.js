const {
  fetchReviewsController,
  fetchReviewController,
} = require("../controllers/reviewController");

exports.fetchReviews = function () {
  return fetchReviewsController();
};

exports.fetchReview = function (_, args) {
  return fetchReviewController({ reviewId: args.id });
};
