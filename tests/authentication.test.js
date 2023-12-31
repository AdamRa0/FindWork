const userModel = require("../models/userModel");
const mongoose = require("mongoose");
const request = require("supertest");
const {
  setupAndStartTestServer,
  queryBuilder,
  httpServer,
} = require("./testUtils");

const newlySignedUpUser = {
  emailAddress: "testuser_2@example.com",
  username: "testuser_2",
  password: "password1234",
};

beforeAll(() => {
  setupAndStartTestServer();
});

afterAll(async () => {
  await userModel.deleteMany({ emailAddress: newlySignedUpUser.emailAddress });
  await mongoose.connection.close();
  await httpServer.close();
});

describe("Authentication unit tests", () => {
  test("test signup new user", async () => {
    const mutationQuery = queryBuilder({
      queryString: `mutation { 
      signupUser(email: "${newlySignedUpUser.emailAddress}", password: "${newlySignedUpUser.password}", username: "${newlySignedUpUser.username}")
    }`,
    });

    const response = await request(httpServer)
      .post("/server")
      .send(mutationQuery);

    expect(response.errors).toBeUndefined();
    expect(response.body.data?.signupUser).toBeTruthy();
  }, 10000);

  test("test signin registered user", async () => {
    const mutationQuery = queryBuilder({
      queryString: `mutation {
        signinUser(email: "${newlySignedUpUser.emailAddress}", password: "${newlySignedUpUser.password}")
      }`,
    });

    const response = await request(httpServer)
      .post("/server")
      .send(mutationQuery);

    expect(response.errors).toBeUndefined();
    expect(response.body.data?.signinUser).toBeTruthy();
  }, 10000);

  test("test wrong password causes signin function to fail", async () => {
    const mutationQuery = queryBuilder({
      queryString: `mutation {
        signinUser(email: ${newlySignedUpUser.emailAddress}, password: ${newlySignedUpUser.password}44)
      }`,
    });

    const response = await request(httpServer)
      .post("/server")
      .send(mutationQuery);

    expect(response.errors).toBeUndefined();
    expect(response.body.data?.signinUser).toBeFalsy();
  }, 10000);
});
