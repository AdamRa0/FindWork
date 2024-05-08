// Top level imports
const app = require("./app");
const Bid = require("./resolvers/Bid");
const Mutation = require("./resolvers/Mutation");
const Job = require("./resolvers/Job");
const Query = require("./resolvers/Query");
const User = require("./resolvers/User");
const Review = require("./resolvers/Review");

// Dependency imports
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

mongoose.connect(process.env.DATABASE_URL).then(function (_) {
  console.log("Successfully connected to database");
});

const resolvers = {
  Query,
  Mutation,
  Bid,
  Job,
  User,
  Review,
};

const port = process.env.PORT || 5000;

const httpServer = http.createServer(app);

const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf-8"),
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  status400ForVariableCoercionErrors: true,
});

async function setupAndStartSServer() {
  await server.start();

  app.get("/", (_, res) => {
    res
      .json({
        status: "OK",
        message:
          "This is a graphql api. Make your queries on the /server endpoint",
      })
      .status(200);
  });

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

setupAndStartSServer();
