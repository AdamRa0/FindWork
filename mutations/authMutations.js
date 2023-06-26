const { signUp, signIn } = require("../controllers/authController");

exports.signupUser = async function (_, args) {
  const { email, password, username, role } = args;

  return signUp({ email: email, password: password, username: username, role: role });
};

exports.signinUser = async function (_, args) {
  const { email, password } = args;

  return signIn({ email: email, userPassword: password });
};
