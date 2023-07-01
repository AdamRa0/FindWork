const {
  createBidController,
  updateBidController,
  deleteBidController,
} = require("../controllers/bidController");

exports.createBid = function (_, args) {
  const { proposal, bidder_id, job_id } = args;

  return createBidController({
    proposal: proposal,
    id: bidder_id,
    jobId: job_id,
  });
};

exports.updateBid = function (_, args) {
  const { id, proposal } = args;

  return updateBidController({ id: id, proposal: proposal });
};

exports.deleteBid = function (_, args) {
  const { id } = args;

  return deleteBidController({ id: id });
};
