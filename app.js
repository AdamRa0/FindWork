const cors = require("cors");
const dotenv = require("dotenv");
const { json } = require("body-parser");
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

dotenv.config();

const app = express();

if (process.env.ENV === "development") {
  app.use(morgan("dev"));
}

app.use(cors(), json(), cookieParser());

module.exports = app;
