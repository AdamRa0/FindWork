const { signUp, signIn } = require("../controllers/authController");

const jwt = require("jsonwebtoken");

const dotenv = require("dotenv");

dotenv.config();

exports.signupUser = function (_, args, { res }) {
  const { email, password, username, role } = args;

  const token = jwt.sign({ userRole: role }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRY_TIME,
  });

  res.cookie("credentials", token, {
    httpOnly: true,
    secure: process.env.ENV === "production",
    maxAge: Date.now() + 24 * 60 * 60 * 1000,
  });

  return signUp({
    email: email,
    password: password,
    username: username,
    role: role,
  });
};

exports.signinUser = async function (_, args, { res }) {
  const { email, password } = args;

  const { role, isMatch } = await signIn({
    email: email,
    userPassword: password,
  });

  const token = jwt.sign({ userRole: role }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRY_TIME,
  });

  res.cookie("credentials", token, {
    httpOnly: true,
    secure: process.env.ENV === "production",
    maxAge: Date.now() + 24 * 60 * 60 * 1000,
  });

  return isMatch;
};
