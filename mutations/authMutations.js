const { signUp, signIn } = require("../controllers/authController");

exports.signupUser = async function (_, args) {
  const { email, password, username } = args;

  return signUp({ email: email, password: password, username: username });
};

exports.signinUser = async function (_, args) {
  const { email, password } = args;

  return signIn({ email: email, userPassword: password });
};
