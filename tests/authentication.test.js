const userModel = require("../models/userModel");
const mongoose = require("mongoose");
const request = require("supertest");
const httpServer = require("../server");

const newlySignedUpUser = {
  emailAddress: "testuser2@example.com",
  username: "testuser2",
  password: "password1234",
};

afterAll(async () => {
  await userModel.deleteMany({ emailAddress: newlySignedUpUser.emailAddress });
  await mongoose.connection.close();
  await httpServer.close();
});

describe("Authentication unit tests", () => {
  test("test signup new user", async () => {
    const mutation = {
      query: `mutation { 
        signupUser(email: "${newlySignedUpUser.emailAddress}", password: "${newlySignedUpUser.password}", username: "${newlySignedUpUser.username}")
      }`,
    };

    const response = await request(httpServer).post("/server").send(mutation);

    expect(response.errors).toBeUndefined();
    expect(response.body.data?.signupUser).toBeTruthy();
  }, 10000);

  test("test signin registered user", async () => {
    const mutation = {
      query: `mutation {
        signinUser(email: "${newlySignedUpUser.emailAddress}", password: "${newlySignedUpUser.password}")
      }`,
    };

    const response = await request(httpServer).post("/server").send(mutation);
    
    expect(response.errors).toBeUndefined();
    expect(response.body.data?.signinUser).toBeTruthy();
  }, 10000);

  test("test wrong password causes signin function to fail", async () => {
    const mutation = {
      query: `mutation {
        signinUser(email: ${newlySignedUpUser.emailAddress}, password: ${newlySignedUpUser.password}44)
      }`,
    };

    const response = await request(httpServer).post("/server").send(mutation);

    expect(response.errors).toBeUndefined();
    expect(response.body.data?.signinUser).toBeFalsy();
  }, 10000);
});
