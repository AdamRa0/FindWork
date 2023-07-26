const { GraphQLError } = require("graphql");

exports.errorBuilder = function ({ errorMessage, errorCode }) {
  return new GraphQLError(errorMessage, {
    extensions: {
      code: errorCode,
    },
  });
};
