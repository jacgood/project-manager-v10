const express = require("express");
const app = express();
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

connectDB();

app.listen(process.env.PORT || 5000, () =>
  console.log("Server is running on port 5000")
);
