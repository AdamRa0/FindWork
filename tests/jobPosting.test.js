const request = require("supertest");
const {
  setupAndStartTestServer,
  httpServer,
  queryBuilder,
} = require("./testUtils");
const mongoose = require("mongoose");
const userModel = require("../models/userModel");
const jobModel = require("../models/jobModel");

const testJob = {
  description: "Test Job Mayne",
  preferences: {
    availability: "30 hrs a week",
    experience: "Expert",
    languages: ["Kiswahili, Dholuo"],
  },
};

const testUser = {
  username: "testUser",
  emailAddress: "testUser@example.com",
  password: "testuser1234",
  role: "Employer",
};

beforeAll(async () => {
  setupAndStartTestServer();
  await userModel.create(testUser);
}, 10000);

afterAll(async () => {
  await userModel.deleteOne({ username: testUser.username });
  await mongoose.connection.close();
  httpServer.close();
});

describe("Job unit tests", () => {
  test("test create job mutation", async () => {
    const jobPoster = await userModel.findOne({
      username: testUser.username,
    });

    const mutationQuery = queryBuilder({
      queryString: `mutation {
        createJob(description: "${testJob.description}", experience: "${testJob.preferences.experience}", availability: "${testJob.preferences.availability}", languages: "${testJob.preferences.languages}", jobPoster: "${jobPoster._id}") {
            description
            jobPoster {
                username
            }
        }
    }`,
    });

    const response = await request(httpServer)
      .post("/server")
      .send(mutationQuery);

    expect(response.errors).toBeUndefined();
    expect(response.body.data?.createJob.description).toBe(testJob.description);
    expect(response.body.data?.createJob.jobPoster.username).toBe(
      testUser.username
    );
  }, 10000);

  test("test update job mutation", async () => {
    const jobToUpdate = await jobModel.findOne({
      description: testJob.description,
    });

    const mutationQuery = queryBuilder({
      queryString: `mutation {
            updateJob(description: "Another ${testJob.description}", experience: "${testJob.preferences.experience}", availability: "${testJob.preferences.availability}", languages: "${testJob.preferences.languages}", id: "${jobToUpdate._id}") {
                description
                jobPoster {
                    username
                }
            }
        }`,
    });

    const response = await request(httpServer)
      .post("/server")
      .send(mutationQuery);

    expect(response.errors).toBeUndefined();
    expect(response.body.data?.updateJob.jobPoster.username).toBe(
      testUser.username
    );
  }, 10000);

  test("test fetch jobs query", async () => {
    const query = queryBuilder({
      queryString: `query {
            fetchJobs {
              _id
              description  
            }
          }`,
    });

    const response = await request(httpServer).post("/server").send(query);

    expect(response.errors).toBeUndefined();
    expect(response.body.data?.fetchJobs.length).toBeGreaterThan(0);
  }, 10000);

  test("test fetch job query", async () => {
    const jobToUpdate = await jobModel.findOne({
      description: `Another ${testJob.description}`,
    });

    const query = queryBuilder({
      queryString: `query {
            fetchJob(id: "${jobToUpdate._id}") {
              description
            }
          }`,
    });

    const response = await request(httpServer).post("/server").send(query);

    expect(response.errors).toBeUndefined();
    expect(response.body.data?.fetchJob.description).toBe(
      `Another ${testJob.description}`
    );
  }, 10000);

  test("test delete job mutation", async () => {
    const jobToDelete = await jobModel.findOne({
      description: `Another ${testJob.description}`,
    });

    const mutationQuery = queryBuilder({
      queryString: `mutation {
            deleteJob(id: "${jobToDelete._id}")
        }`,
    });

    const response = await request(httpServer)
      .post("/server")
      .send(mutationQuery);

    expect(response.errors).toBeUndefined();
    expect(response.body.data?.deleteJob).toBe("Job was successfully deleted");
  }, 10000);
});
