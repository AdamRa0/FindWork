const express = require("express");
const morgan = require("morgan");

const app = express();

if (process.env.DEV_ENV === "development") {
  app.use(morgan("dev"));
}

module.exports = app;
