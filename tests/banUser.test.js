const request = require("supertest");
const {
  setupAndStartTestServer,
  httpServer,
  queryBuilder,
} = require("./testUtils");
const mongoose = require("mongoose");
const userModel = require("../models/userModel");

const testUser = {
  username: "testadmin",
  emailAddress: "testadmin@example.com",
  password: "testpassword",
  role: "Admin",
};

const testUserTwo = {
  username: "testworker",
  emailAddress: "testworker@example.com",
  password: "testpassword",
  role: "Worker",
};

beforeAll(async () => {
  setupAndStartTestServer();
  await userModel.create(testUser);
  await userModel.create(testUserTwo);
}, 20000);

afterAll(async () => {
  await userModel.deleteOne({ username: testUser.username });
  await userModel.deleteOne({ username: testUserTwo.username });
  await mongoose.connection.close();
  httpServer.close();
});

describe("Ban user unit test", () => {
  test("test ban user", async () => {
    const userToBan = await userModel.findOne({
      username: testUserTwo.username,
    });

    console.log(userToBan)

    const signInQuery = queryBuilder({
      queryString: `mutation {
        signinUser(email: ${testUser.emailAddress}, password: ${testUser.password})
    }`,
    });

    const banUserQuery = queryBuilder({
      queryString: `mutation {
        banUser(userID: ${userToBan._id})
      }`,
    });

    const response = await request(httpServer)
      .post("/server")
      .send(signInQuery)
      .send(banUserQuery);

    console.log(response.body)

    expect(response.errors).toBeUndefined();
    expect(response.body.data?.banUser).toBe("User successfully banned");
  }, 10000);
});
