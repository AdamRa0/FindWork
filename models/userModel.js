const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const { Worker } = require("node:worker_threads");

dotenv.config();

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is a required field."],
    unique: true,
  },
  profilePicture: String,
  emailAddress: {
    type: String,
    required: [true, "Email address is a required field."],
  },
  banned: {
    type: Boolean,
    default: false,
  },
  experience: String,
  education: String,
  payRate: String,
  availability: String,
  role: {
    type: String,
    enum: ["Admin", "Employer", "Worker"],
    default: "Worker",
  },
  password: {
    type: String,
    required: [true, "Password is a required field."],
    minLength: 12,
    select: false,
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  jobs: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Job",
    },
  ],
  bids: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Job",
    },
  ],
  reviews: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Review",
    },
  ],
});

function hashPassword(password, saltRounds) {
  return new Promise((resolve, reject) => {
    const worker = new Worker(path.resolve(__dirname, '../utils/hashPassword.js'), {
      workerData: { password, saltRounds }
    });

    worker.on('message', resolve);
    worker.on('error', reject);
    worker.on('exit', (code) => {
      if (code !== 0)
        reject(new Error(`Worker stopped with exit code ${code}`));
    });
  });
}

function confirmPassword(plainText, password) {
  return new Promise((resolve, reject) => {
    const worker = new Worker(path.resolve(__dirname, '../utils/comparePassword.js'), {
      workerData: { plainText, password }
    });

    worker.on('message', resolve);
    worker.on('error', reject);
    worker.on('exit', (code) => {
      if (code !== 0)
        reject(new Error(`Worker stopped with exit code ${code}`));
    });
  });
}

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await hashPassword(
    this.password,
    parseInt(process.env.SALT_ROUNDS)
  );

  next();
});

userSchema.methods.comparePassword = async function (
  plainTextPassword,
  userPassword
) {
  return await confirmPassword(plainTextPassword, userPassword);
};

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
