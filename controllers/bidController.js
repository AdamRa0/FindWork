const bidModel = require("../models/bidModel");
const jobModel = require("../models/jobModel");
const userModel = require("../models/userModel");

exports.createBidController = async function ({ proposal, id, jobId }) {
  /**
   * Creates a new bid
   *
   * Arguments
   * ---------
   * proposal: Text containing bid details
   * id: id of bid creator
   * jobId: id of job being bidded
   */

  const bid = await bidModel.create({
    proposal: proposal,
    bidder: id,
    auctionedJob: jobId,
  });

  await userModel.updateOne({ _id: id }, { $push: { bids: bid.id } });

  await jobModel.updateOne({ _id: jobId }, { $push: { bids: bid.id } });

  return bid;
};

exports.fetchBidsController = async function () {
  // Returns all bids posted
  const bids = await bidModel.find();

  return bids;
};

exports.fetchBidController = async function ({ bidId }) {
  // Returns a specific bid
  const bid = await bidModel.findById(bidId);

  return bid;
};

exports.updateBidController = async function ({ id, proposal }) {
  /**
   * Updates selected bid
   *
   * Arguments
   * ---------
   * id: id of bid being updated
   * proposal: updated proposal
   */

  const updatedBid = await bidModel.findOneAndUpdate(
    { _id: id },
    { proposal: proposal },
    { new: true }
  );

  return updatedBid;
};

exports.deleteBidController = async function ({ id }) {
  /**
   * Deletes selected bid
   *
   * Arguments
   * ---------
   * Id of bid to be deleted
   */

  const deletedBid = await bidModel.findOneAndDelete({ _id: id });

  const bidderId = deletedBid.bidder;
  const jobId = deletedBid.auctionedJob;

  if (!deletedBid) {
    return "Failed to delete bid. Try again";
  }

  await userModel.updateOne(
    { _id: bidderId },
    { $pull: { bids: deletedBid.id } }
  );

  await jobModel.updateOne(
    { _id: jobId },
    { $pull: { bids: deletedBid.id } }
  );

  return "Bid successfully deleted";
};
