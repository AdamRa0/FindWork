const { errorBuilder } = require("../utils/errorBuilder");
const { banUserController } = require("../controllers/userController");

function banUser(_, args, { credentials }) {
  const { userID } = args;

  if (credentials !== "Admin") {
    const error = errorBuilder({
      errorMessage: "You are not authorized to ban this user",
      errorCOde: "FORBIDDEN",
    });

    throw error;
  }

  return banUserController({ userID: userID });
}

module.exports = { banUser };
