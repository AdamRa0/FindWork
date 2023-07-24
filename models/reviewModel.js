const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
    required: [true, "A review needs a rating."],
  },
  reviewText: {
    type: String,
    required: [true, "A review needs a review text."],
  },
  author: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  reviewee: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
});

const ReviewModel = mongoose.model("Review", reviewSchema);

module.exports = ReviewModel;
