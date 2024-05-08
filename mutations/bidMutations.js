const {
  createBidController,
  updateBidController,
  deleteBidController,
} = require("../controllers/bidController");

const { errorBuilder } = require("../utils/errorBuilder");

exports.createBid = function (_, args, { credentials }) {
  const { proposal, bidder_id, job_id } = args;

  if (credentials !== "Worker") {
    const error = errorBuilder({
      errorMessage: "You are not authorized to create a bid",
      errorCode: "FORBIDDEN",
    });
    throw error;
  }

  return createBidController({
    proposal: proposal,
    id: bidder_id,
    jobId: job_id,
  });
};

exports.updateBid = function (_, args, { credentials }) {
  const { id, proposal } = args;

  if (credentials !== "Worker") {
    const error = errorBuilder({
      errorMessage: "You are not authorized to update a bid",
      errorCode: "FORBIDDEN",
    });
    throw error;
  }

  return updateBidController({ id: id, proposal: proposal });
};

exports.deleteBid = function (_, args, { credentials }) {
  const { id } = args;

  if (credentials !== "Worker" || credentials !== "Admin") {
    const error = errorBuilder({
      errorMessage: "You are not authorized to delete a bid",
      errorCode: "FORBIDDEN",
    });
    throw error;
  }

  return deleteBidController({ id: id });
};
