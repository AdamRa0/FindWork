// const ReviewModel = require("../models/reviewModel");

// const mongoose = require("mongoose");
// const dotenv = require("dotenv");

// dotenv.config();

// const testReview = {
//   rating: 4,
//   reviewText: "Quite the lad",
// };

// beforeAll(() => {
//   mongoose.connect(process.env.TEST_DATABASE_URL);
// });

// afterAll(async () => {
//   await ReviewModel.findOneAndDelete({ rating: testReview.rating });
//   mongoose.connection.close();
// });

// describe("Review Model", () => {
//   test("Test review model successfully saved in database", async () => {
//     const review = await ReviewModel.create(testReview);

//     expect(review).not.toBeNull();
//   });
// }, 10000);
