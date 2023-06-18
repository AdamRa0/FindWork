const userModel = require("../models/userModel");
const dotenv = require("dotenv");

dotenv.config();

exports.signUp = async function (req, res, next) {
  const { email, password, username } = req.body;

  if (!email || !password || username) {
    res.status(400).json({
      status: "fail",
      message: "Please provide email, password and username",
    });
  }

  const user = await userModel.create({
    emailAddress: email,
    password: password,
    username: username,
  });

  if (user === null) {
    res.status(500).json({
      status: "fail",
      message: "Failed to sign up user. Please try again.",
    });
  }

  res.status(201).json({
    status: "success",
    user,
  });
};

exports.signIn = async function (req, res, next) {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({
      status: "fail",
      message: "Please provide email and password",
    });
  }

  const { userPassword } = await userModel
    .findOne({ email: email })
    .select("+password");

  const match = userModel.comparePassword(password, userPassword);

  if (!match) {
    res.status(401).json({
      status: "fail",
      message: "Wrong username or password",
    });
  }

  res.status(200).json({
    status: "success",
    message: "Signin successful",
  });
};
