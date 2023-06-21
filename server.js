// Top level imports
const app = require("./app");
const Mutation = require("./resolvers/Mutation");

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

dotenv.config();

// TODO: Uncomment after project completion
// process.on("uncaughtException", function () {
//   console.log("Unhandled exception. Server shutting down...");
//   process.exit(1);
// });

mongoose.set("strictQuery", false);

mongoose.connect(process.env.DATABASE_URL).then(function (_) {
  console.log("Successfully connected to database");
});

const resolvers = {
  Mutation
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

  app.use("/server", expressMiddleware(server));

  await new Promise((resolve) => httpServer.listen({ port: port }, resolve));

  console.log(`Server starting at port: ${port}`);
}

setupAndStartSServer();

// TODO: Uncomment after project completion
// process.on("unhandledRejection", async function () {
//   console.log("Unhandled rejection. Server shutting down...");
//   await server.close();
//   httpServer.close(function () {
//     process.exit(1);
//   });
// });
