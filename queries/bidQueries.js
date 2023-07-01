const {
  fetchBidsController,
  fetchBidController,
} = require("../controllers/bidController");

exports.fetchBids = function (parent, _) {
  return fetchBidsController();
};

exports.fetchBid = function (_, args) {
  return fetchBidController({ bidId: args.id });
};
