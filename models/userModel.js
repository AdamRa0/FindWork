const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

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
  },
  jobs: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Job",
    },
  ],
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(
    this.password,
    parseInt(process.env.SALT_ROUNDS)
  );

  next();
});

userSchema.methods.comparePassword = async function (
  plainTextPassword,
  userPassword
) {
  return await bcrypt.compare(plainTextPassword, userPassword);
};

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
