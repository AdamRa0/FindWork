const userModel = require("../models/userModel");
const dotenv = require("dotenv");

dotenv.config();

exports.signUp = async function ({ email, password, username }) {
  /**
   * Saves a new user to database.
   * Returns true if user saved successfully. False if otherwise.
   * 
   * Arguments
   * ---------
   * email: User's email address
   * password: User's password
   * username: User's desired username
  */
  const user = await userModel.create({
    emailAddress: email,
    password: password,
    username: username,
  });

  return user !== null;
};

exports.signIn = async function ({ email, userPassword }) {
  /**
   * Signs in a registered user.
   * Returns true after a successful signin. False if otherwise.
   *
   * Arguments
   * ---------
   * email: Registered user email
   * password: Registered user password
   */

  const user = await userModel
    .findOne({ emailAddress: email })
    .select("+password");

  const match = user.comparePassword(userPassword, user.password);

  return match;
};
