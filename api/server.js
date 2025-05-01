require("dotenv").config();
const express = require("express");
const app = express();
const router = require("../routers/route.js");
const serverless = require("serverless-http");
const cors = require("cors");

// database
const connectDB = require("../config/database.js");

const port = process.env.PORT || 4000;

// middleware
app.use(cors());
app.use(express.json());
app.use("/assets", express.static("uploads/"));

// routing
app.use("/", router);

module.exports = app;
module.exports.handler = serverless(app);

connectDB().then(() => {
  app.listen(port, () => {
    console.log("Server Running on port", port);
  });
});
