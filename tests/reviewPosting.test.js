const UserModel = require("../models/userModel");
const ReviewModel = require("../models/reviewModel");

const {
  httpServer,
  queryBuilder,
  setupAndStartTestServer,
} = require("./testUtils");

const request = require("supertest");

const mongoose = require("mongoose");

const testUser = {
  username: "testuser",
  emailAddress: "testuser@example.com",
  password: "testuser1234",
};

const testUserTwo = {
  username: "testuser2",
  emailAddress: "testuser2@example.com",
  password: "testuser21234",
};

const testReview = {
  rating: 4,
  reviewText: "Decent user tbh",
};

beforeAll(async () => {
  setupAndStartTestServer();
  await UserModel.create(testUser);
  await UserModel.create(testUserTwo);
}, 15000);

afterAll(async () => {
  await UserModel.deleteMany({});
  await mongoose.connection.close();
  httpServer.close();
});

describe("Review unit tests", () => {
  test("test create review mutation", async () => {
    const author = await UserModel.findOne({ username: testUser.username });
    const reviewee = await UserModel.findOne({
      username: testUserTwo.username,
    });

    const mutationQuery = queryBuilder({
      queryString: `mutation {
        createReview(rating: ${testReview.rating}, reviewText: "${testReview.reviewText}", author: "${author._id}", reviewee: "${reviewee._id}") {
          rating
          reviewText
          author {
            username
          }  
          reviewee {
            username
          }
        }
      }`,
    });

    const response = await request(httpServer)
      .post("/server")
      .send(mutationQuery);

    expect(response.body.data?.createReview.rating).toBe(testReview.rating);
    expect(response.body.data?.createReview.reviewText).toBe(
      testReview.reviewText
    );
    expect(response.body.data?.createReview.author.username).toBe(
      testUser.username
    );
    expect(response.body.data?.createReview.reviewee.username).toBe(
      testUserTwo.username
    );
  }, 10000);

  test("test fetch reviews query", async () => {
    const mutationQuery = queryBuilder({
      queryString: `query {
          fetchReviews {
            rating
            reviewText
            author {
              username
            }
            reviewee {
              username
            }
          }
        }`,
    });

    const response = await request(httpServer)
      .post("/server")
      .send(mutationQuery);

    expect(response.body.data?.fetchReviews.length).toBeGreaterThan(0);
  }, 10000);

  test("test fetch review query", async () => {
    const { _id } = await ReviewModel.findOne({
      reviewText: testReview.reviewText,
    });

    const mutationQuery = queryBuilder({
      queryString: `query {
          fetchReview(id: "${_id}") {
            rating
            reviewText
            author {
              username
            }
            reviewee {
              username
            }
          }
        }`,
    });

    const response = await request(httpServer)
      .post("/server")
      .send(mutationQuery);

    expect(response.body.data?.fetchReview.rating).toBe(testReview.rating);
    expect(response.body.data?.fetchReview.reviewText).toBe(
      testReview.reviewText
    );
    expect(response.body.data?.fetchReview.author.username).toBe(
      testUser.username
    );
    expect(response.body.data?.fetchReview.reviewee.username).toBe(
      testUserTwo.username
    );
  }, 10000);

  test("test update review mutation", async () => {
    const { _id } = await ReviewModel.findOne({
      reviewText: testReview.reviewText,
    });

    const newReviewText = "Updated review text";

    const mutationQuery = queryBuilder({
      queryString: `mutation {
          updateReview(id: "${_id}", reviewText: "${newReviewText}") {
            rating
            reviewText
            author {
              username
            }
            reviewee {
              username
            }
          }
        }`,
    });

    const response = await request(httpServer)
      .post("/server")
      .send(mutationQuery);

    expect(response.body.data?.updateReview.rating).toBe(testReview.rating);
    expect(response.body.data?.updateReview.reviewText).toBe(newReviewText);
    expect(response.body.data?.updateReview.author.username).toBe(
      testUser.username
    );
    expect(response.body.data?.updateReview.reviewee.username).toBe(
      testUserTwo.username
    );
  }, 10000);

  test("test delete review mutation", async () => {
    const { _id } = await ReviewModel.findOne({ rating: testReview.rating });

    const mutationQuery = await queryBuilder({
      queryString: `mutation {
          deleteReview(id: "${_id}")
        }`,
    });

    const response = await request(httpServer)
      .post("/server")
      .send(mutationQuery);

    expect(response.body.data?.deleteReview).toBe("Review deleted");
  }, 10000);
});
