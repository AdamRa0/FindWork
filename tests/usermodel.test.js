const dotenv = require("dotenv");
const mongoose = require("mongoose");
const userModel = require("../models/userModel");

dotenv.config();

const testUsers = [
  {
    username: "test_user",
    emailAddress: "test_user@example.com",
    password: "testpassword",
  },
  {
    username: "test_user_2",
    emailAddress: "test_user_2@example.com",
    password: "testpassword1234",
  },
];

beforeAll(async () => {
  mongoose.set("strictQuery", false);
  await mongoose.connect(process.env.TEST_DATABASE_URL);
});

afterAll(async () => {
  await userModel.deleteMany({});
  mongoose.connection.close();
});

describe("User Model", () => {
  test("test test_user_one created successfully", async () => {
    const newlyCreatedUser = await userModel.create({
      username: testUsers[0].username,
      emailAddress: testUsers[0].emailAddress,
      password: testUsers[0].password,
    });

    expect(newlyCreatedUser).not.toBeNull;
  }, 10000);

  test("test test_user_two created successfully", async () => {
    const newlyCreatedUser = await userModel.create({
      username: testUsers[1].username,
      emailAddress: testUsers[1].emailAddress,
      password: testUsers[1].password,
    });

    expect(newlyCreatedUser).not.toBeNull;
  }, 10000);

  test("test userSchema comparePasswordsWork", async () => {
    const testUser = await userModel
      .findOne({ emailAddress: "test_user_2@example.com" })
      .select("+password");

    const plainTestUserPassword = testUsers[1].password;

    const passwordsMatch = await testUser.comparePassword(
      plainTestUserPassword,
      testUser.password
    );

    expect(passwordsMatch).toBeTruthy;
  }, 10000);

  test("test test_user_one password encrypted successfully", async () => {
    const testUser = await userModel
      .findOne({ emailAddress: "test_user@example.com" })
      .select("+password");

    expect(testUser.password).not.toBe(testUsers[0].password);
  });

  test("test test_user_two password encrypted successfully", async () => {
    const testUser = await userModel
      .findOne({ emailAddress: "test_user_2@example.com" })
      .select("+password");

    expect(testUser.password).not.toBe(testUsers[1].password);
  });
});
