const ReviewModel = require("../models/reviewModel");

exports.fetchReviewsController = async function () {
  const reviews = await ReviewModel.find();

  return reviews;
};

exports.fetchReviewController = async function ({ reviewId }) {
  const review = await ReviewModel.findById({ _id: reviewId });

  return review;
};

exports.createReviewController = async function ({
  rating,
  reviewText,
  author,
  reviewee,
}) {
  const newReview = {
    rating,
    reviewText,
    author,
    reviewee,
  };

  const review = await ReviewModel.create(newReview);

  return review;
};

exports.updateReviewController = async function ({
  reviewId,
  updatedRating,
  updatedReviewText,
}) {
  const { reviewText, rating } = await ReviewModel.findById({ _id: reviewId });

  const newRating = updatedRating ? updatedRating : rating;
  const newReviewText = updatedReviewText ? updatedReviewText : reviewText;

  const updatedReview = await ReviewModel.findOneAndUpdate(
    { _id: reviewId },
    { rating: newRating, reviewText: newReviewText },
    { new: true }
  );

  return updatedReview;
};

exports.deleteReviewController = async function ({ reviewId }) {
  const deletedReview = await ReviewModel.findOneAndDelete({ _id: reviewId });

  return deletedReview ? "Review deleted" : "Something went wrong. Try again";
};
