const cors = require("cors");
const dotenv = require("dotenv")
const { json } = require("body-parser");
const express = require("express");
const morgan = require("morgan");

dotenv.config();

const app = express();

if (process.env.DEV_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(
  cors(),
  json()
);

module.exports = app;
