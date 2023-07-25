const request = require("supertest");
const {
  setupAndStartTestServer,
  httpServer,
  queryBuilder,
} = require("./testUtils");
const mongoose = require("mongoose");
const UserModel = require("../models/userModel");
const JobModel = require("../models/jobModel");
const BidModel = require("../models/bidModel");

const testUser = {
  username: "testworker",
  emailAddress: "testworker@example.com",
  password: "basedtestworker",
};

const testJob = {
  description: "just a test job. nothing major",
  preferences: {
    availability: "20 hrs a week",
    experience: "Beginner",
    languages: ["Patois", "Creole"],
  },
};

const testBid = {
  proposal: "Test bid for a test job",
};

beforeAll(async () => {
  setupAndStartTestServer();
  await UserModel.create(testUser);
  await JobModel.create(testJob);
}, 10000);

afterAll(async () => {
  await UserModel.deleteOne({ username: testUser.username });
  await JobModel.deleteOne({ description: testJob.description });
  await mongoose.connection.close();
  httpServer.close();
}, 10000);

describe("Bid unit tests", () => {
  test("test create bid mutation", async () => {
    const bidPoster = await UserModel.findOne({ username: testUser.username });

    const jobToBid = await JobModel.findOne({
      description: testJob.description,
    });

    const mutationQuery = queryBuilder({
      queryString: `mutation {
        createBid(proposal: "${testBid.proposal}", job_id: "${jobToBid._id}", bidder_id: "${bidPoster._id}") {
          proposal
          bidder {
            username
          }
          auctionedJob {
            description
          }
        }
      }`,
    });

    const response = await request(httpServer)
      .post("/server")
      .send(mutationQuery);

    expect(response.body.data?.createBid.proposal).toBe(testBid.proposal);
    expect(response.body.data?.createBid.bidder.username).toBe(
      testUser.username
    );
    expect(response.body.data?.createBid.auctionedJob.description).toBe(
      testJob.description
    );
  }, 10000);

  test("test fetch bids query", async () => {
    const query = queryBuilder({
      queryString: `query {
        fetchBids {
          proposal
        }
      }`,
    });

    const response = await request(httpServer).post("/server").send(query);

    expect(response.body.data?.fetchBids.length).toBeGreaterThan(0);
  }, 10000);

  test("test fetch bid query", async () => {
    const { _id } = await BidModel.findOne({ proposal: testBid.proposal });

    const query = queryBuilder({
      queryString: `query {
        fetchBid(id: "${_id}") {
          proposal
        }
      }`,
    });

    const response = await request(httpServer).post("/server").send(query);

    expect(response.body.data?.fetchBid.proposal).toBe(testBid.proposal);
  }, 10000);

  test("test update bid mutation", async () => {
    const { _id } = await BidModel.findOne({ proposal: testBid.proposal });

    const mutationQuery = queryBuilder({
      queryString: `mutation {
        updateBid(proposal: "Updated test bid proposal.", id: "${_id}") {
          proposal
        }
      }`,
    });

    const response = await request(httpServer)
      .post("/server")
      .send(mutationQuery);

    expect(response.body.data?.updateBid.proposal).not.toBe(testBid.proposal);
    expect(response.body.data?.updateBid.proposal).toBe(
      "Updated test bid proposal."
    );
  }, 10000);

  test("test update bid mutation", async () => {
    const { _id } = await BidModel.findOne({
      proposal: "Updated test bid proposal.",
    });

    const mutationQuery = queryBuilder({
      queryString: `mutation {
        deleteBid(id: "${_id}")
      }`,
    });

    const response = await request(httpServer)
      .post("/server")
      .send(mutationQuery);

    expect(response.body.data?.deleteBid).toBe("Bid successfully deleted");
  }, 10000);
});
