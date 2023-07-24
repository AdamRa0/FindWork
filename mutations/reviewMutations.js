const {
  createReviewController,
  updateReviewController,
  deleteReviewController,
} = require("../controllers/reviewController");

function createReview(_, args) {
  return createReviewController({
    rating: args.rating,
    reviewText: args.reviewText,
    author: args.author,
    reviewee: args.reviewee,
  });
}

function updateReview(_, args) {
  return updateReviewController({
    reviewId: args.id,
    updatedRating: args.rating,
    updatedReviewText: args.reviewText,
  });
}

function deleteReview(_, args) {
  return deleteReviewController({ reviewId: args.id });
}

module.exports = {
  createReview,
  updateReview,
  deleteReview,
};
