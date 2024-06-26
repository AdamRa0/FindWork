const app = require("../app");
const Mutation = require("../resolvers/Mutation");
const Job = require("../resolvers/Job");
const Query = require("../resolvers/Query");
const User = require("../resolvers/User");
const Bid = require("../resolvers/Bid");
const Review = require("../resolvers/Review");

const { ApolloServer } = require("@apollo/server");
const {
  ApolloServerPluginDrainHttpServer,
} = require("@apollo/server/plugin/drainHttpServer");
const dotenv = require("dotenv");
const { expressMiddleware } = require("@apollo/server/express4");
const fs = require("fs");
const http = require("http");
const mongoose = require("mongoose");
const path = require("path");
const jwt = require("jsonwebtoken");

dotenv.config();

mongoose.set("strictQuery", false);

mongoose.connect(process.env.TEST_DATABASE_URL).then(function (_) {
  console.log("Successfully connected to database");
});

const resolvers = {
  Query,
  Mutation,
  Job,
  User,
  Bid,
  Review,
};

const port = process.env.PORT || 2000;
const httpServer = http.createServer(app);

const server = new ApolloServer({
  typeDefs: fs.readFileSync(
    path.join(process.cwd(), "schema.graphql"),
    "utf-8"
  ),
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  status400ForVariableCoercionErrors: true,
});

async function setupAndStartTestServer() {
  await server.start();

  app.use(
    "/server",
    (req, _, next) => {
      try {
        if (!req.cookies.credentials) {
          return next();
        }

        const { userRole } = jwt.verify(
          req.cookies.credentials,
          process.env.JWT_SECRET_KEY
        );
        req.role = userRole;
      } catch (error) {
        console.log(error);
      }

      return next();
    },
    expressMiddleware(server, {
      context: ({ req, res }) => ({ res, credentials: req.role }),
    })
  );

  await new Promise((resolve) => httpServer.listen({ port: port }, resolve));

  console.log(`Server starting at port: ${port}`);
}

function queryBuilder({ queryString }) {
  const query = {
    query: queryString,
  };

  return query;
}

module.exports = {
  setupAndStartTestServer,
  httpServer,
  queryBuilder,
};
