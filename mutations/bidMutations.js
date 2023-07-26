const {
  createBidController,
  updateBidController,
  deleteBidController,
} = require("../controllers/bidController");

const { GraphQLError } = require("graphql");

exports.createBid = function (_, args, { credentials }) {
  const { proposal, bidder_id, job_id } = args;

  if (credentials !== "Worker") {
    throw new GraphQLError("You are not authorized to create a bid.", {
      extensions: {
        code: "FORBIDDEN",
      },
    });
  }

  return createBidController({
    proposal: proposal,
    id: bidder_id,
    jobId: job_id,
  });
};

exports.updateBid = function (_, args) {
  const { id, proposal } = args;

  if (credentials !== "Worker") {
    throw new GraphQLError("You are not authorized to update a bid.", {
      extensions: {
        code: "FORBIDDEN",
      },
    });
  }

  return updateBidController({ id: id, proposal: proposal });
};

exports.deleteBid = function (_, args) {
  const { id } = args;

  if (credentials !== "Worker" || credentials !== "Admin") {
    throw new GraphQLError("You are not authorized to dekete a bid.", {
      extensions: {
        code: "FORBIDDEN",
      },
    });
  }

  return deleteBidController({ id: id });
};
