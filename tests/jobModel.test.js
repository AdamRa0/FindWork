const dotenv = require("dotenv");
const mongoose = require("mongoose");
const jobModel = require("../models/jobModel");

dotenv.config();

const testJobs = [
  {
    description: "This is a test job",
    preferences: {
      availability: "20 hrs a week",
      experience: "Beginner",
      languages: ["Sheng', Malagasy"],
    },
  },
  {
    description: "This is another test job",
    preferences: {
      availability: "30 hrs a week",
      experience: "Intermediate",
      languages: ["Lingala, Comoran Creole"],
    },
  },
];

beforeAll(async () => {
  mongoose.set("strictQuery", false);
  await mongoose.connect(process.env.TEST_DATABASE_URL);
});

afterAll(async () => {
  await jobModel.deleteMany({});
  mongoose.connection.close();
});

describe("Job Model", () => {
  test("test test_job_one created successfully", async () => {
    firstTestJob = testJobs[0];

    const savedJob = await jobModel.create(firstTestJob);

    expect(savedJob.description).toBe(firstTestJob.description);
    expect(savedJob.experience).toBe(firstTestJob.experience);
    expect(savedJob.languages).toBe(firstTestJob.language);
  }, 10000);

  test("test test_job_two created successfully", async () => {
    secondTestJob = testJobs[1];

    const savedJob = await jobModel.create(secondTestJob);

    expect(savedJob.description).toBe(secondTestJob.description);
    expect(savedJob.experience).toBe(secondTestJob.experience);
    expect(savedJob.languages).toBe(secondTestJob.language);
  }, 10000);
});
