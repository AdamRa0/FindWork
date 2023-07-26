const {
  createReviewController,
  updateReviewController,
  deleteReviewController,
} = require("../controllers/reviewController");

const { GraphQLError } = require("graphql");

function createReview(_, args, { credentials }) {
  if (credentials !== "Worker" || credentials !== "Employer") {
    throw new GraphQLError("You are not authoraized to create a review", {
      extensions: {
        code: "FORBIDDEN",
      },
    });
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
    throw new GraphQLError("You are not authoraized to create a review", {
      extensions: {
        code: "FORBIDDEN",
      },
    });
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
    throw new GraphQLError("You are not authoraized to create a review", {
      extensions: {
        code: "FORBIDDEN",
      },
    });
  }

  return deleteReviewController({ reviewId: args.id });
}

module.exports = {
  createReview,
  updateReview,
  deleteReview,
};
