const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bidModel = require("../models/bidModel");

dotenv.config();

const testBid = {
  proposal: "Test proposal for test bid",
};

beforeAll(() => {
  mongoose.connect(process.env.TEST_DATABASE_URL);
});

afterAll(async () => {
  await bidModel.deleteOne({ proposal: testBid.proposal });
  mongoose.connection.close();
});

describe("Bid Model", () => {
  test("Test bid model successfully saved in database", async () => {
    const user = await bidModel.create(testBid);

    expect(user).not.toBeNull();
  });
});
