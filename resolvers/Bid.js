const bidModel = require("../models/bidModel");

async function bidder(parent, _) {
  const { bidder } = await bidModel
    .findById(parent.id)
    .populate({ path: "bidder" });

  return bidder;
}

async function auctionedJob(parent, _) {
  const { auctionedJob } = await bidModel
    .findById(parent.id)
    .populate({ path: "auctionedJob" });

  return auctionedJob;
}

module.exports = {
  bidder,
  auctionedJob,
};
