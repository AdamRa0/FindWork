const BidModel = require("../models/bidModel");
const JobModel = require("../models/jobModel");
const UserModel = require("../models/userModel");

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

  const bid = await BidModel.create({
    proposal: proposal,
    bidder: id,
    auctionedJob: jobId,
  });

  await UserModel.updateOne({ _id: id }, { $push: { bids: bid.id } });

  await JobModel.updateOne({ _id: jobId }, { $push: { bids: bid.id } });

  return bid;
};

exports.fetchBidsController = async function () {
  // Returns all bids posted
  const bids = await BidModel.find();

  return bids;
};

exports.fetchBidController = async function ({ bidId }) {
  // Returns a specific bid
  const bid = await BidModel.findById(bidId);

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

  const updatedBid = await BidModel.findOneAndUpdate(
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

  const deletedBid = await BidModel.findOneAndDelete({ _id: id });

  const bidderId = deletedBid.bidder;
  const jobId = deletedBid.auctionedJob;

  if (!deletedBid) {
    return "Failed to delete bid. Try again";
  }

  await UserModel.updateOne(
    { _id: bidderId },
    { $pull: { bids: deletedBid.id } }
  );

  await JobModel.updateOne({ _id: jobId }, { $pull: { bids: deletedBid.id } });

  return "Bid successfully deleted";
};
