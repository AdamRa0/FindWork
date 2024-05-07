const {
  createReviewController,
  updateReviewController,
  deleteReviewController,
} = require("../controllers/reviewController");

const { errorBuilder } = require("../utils/errorBuilder");

function createReview(_, args, { credentials }) {
  if (credentials !== "Worker" || credentials !== "Employer") {
    const error = errorBuilder({
      errorMessage: "You are not authorized to create a review",
      errorCode: "FORBIDDEN",
    });
    throw error;
  }

  return createReviewController({
    rating: args.rating,
    reviewText: args.reviewText,
    author: args.author,
    reviewee: args.reviewee,
  });
}

function updateReview(_, args, { credentials }) {
  if (credentials !== "Worker" || credentials !== "Employer") {
    const error = errorBuilder({
      errorMessage: "You are not authorized to update a review",
      errorCode: "FORBIDDEN",
    });
    throw error;
  }

  return updateReviewController({
    reviewId: args.id,
    updatedRating: args.rating,
    updatedReviewText: args.reviewText,
  });
}

function deleteReview(_, args, { credentials }) {
  if (
    credentials !== "Worker" ||
    credentials !== "Employer" ||
    credentials !== "Admin"
  ) {
    const error = errorBuilder({
      errorMessage: "You are not authorized to delete a review",
      errorCode: "FORBIDDEN",
    });
    throw error;
  }

  return deleteReviewController({ reviewId: args.id });
}

module.exports = {
  createReview,
  updateReview,
  deleteReview,
};
