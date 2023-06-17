const app = require("./app");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config();

process.on("uncaughtException", function () {
  console.log("Unhandled exception. Server shutting down...");
  process.exit(1);
});

mongoose.set("strictQuery", false);

mongoose.connect(process.env.DATABASE_URL).then(function (_) {
  console.log("Successfully connected to database");
});

const port = 4000 || process.env.PORT;

const server = app.listen(port, function () {
  console.log(`Server running on port: ${port}`);
});

process.on("unhandledRejection", function() {
  console.log("Unhandled rejection. Server shutting down...");
  server.close(function() {
    process.exit(1);
  });
})