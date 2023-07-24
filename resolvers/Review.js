const ReviewModel = require("../models/reviewModel");

async function author(parent, _) {
  const { author } = await ReviewModel.findById(parent.id).populate({
    path: "author",
  });

  return author;
}

async function reviewee(parent, _) {
  const { reviewee } = await ReviewModel.findById(parent.id).populate({
    path: "reviewee",
  });

  return reviewee;
}

module.exports = {
  author,
  reviewee,
};
