const cors = require("cors");
const { json } = require("body-parser");
const express = require("express");
const morgan = require("morgan");

const app = express();

if (process.env.DEV_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(
  cors(),
  json()
);

module.exports = app;
