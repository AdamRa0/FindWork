const request = require("supertest");
const {
  setupAndStartTestServer,
  httpServer,
  queryBuilder,
} = require("./testUtils");
const mongoose = require("mongoose");
const userModel = require("../models/userModel");
const jobModel = require("../models/jobModel");
const bidModel = require("../models/bidModel");

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
  await userModel.create(testUser);
  await jobModel.create(testJob);
}, 10000);

afterAll(async () => {
  await userModel.deleteOne({ username: testUser.username });
  await jobModel.deleteOne({ description: testJob.description });
  await bidModel.deleteMany({});
  await mongoose.connection.close();
  httpServer.close();
}, 10000);

describe("Bid unit tests", () => {
  test("test create bid mutation", async () => {
    const bidPoster = await userModel.findOne({ username: testUser.username });

    const jobToBid = await jobModel.findOne({
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
    const mutationQuery = queryBuilder({
      queryString: `query {
        fetchBids {
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

    console.log(response.body.errors);

    expect(response.body.data?.fetchBids[0].proposal).toBe(testBid.proposal);
    expect(response.body.data?.fetchBids[0].bidder.username).toBe(
      testUser.username
    );
    expect(response.body.data?.fetchBids[0].auctionedJob.description).toBe(
      testJob.description
    );
  }, 10000);
});
