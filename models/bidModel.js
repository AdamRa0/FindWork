const mongoose = require("mongoose");

const bidSchema = new mongoose.Schema({
  proposal: {
    type: String,
    required: [true, "A bid needs a proposal"],
  },
  bidder: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  auctionedJob: {
    type: mongoose.Types.ObjectId,
    ref: "Job",
  },
});

const bidModel = mongoose.model("Bid", bidSchema);

module.exports = bidModel;
