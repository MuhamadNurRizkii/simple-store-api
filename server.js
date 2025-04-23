require("dotenv").config();
const express = require("express");
const app = express();
const router = require("./routers/route.js");

// database
const connectDB = require("./config/database.js");

const port = process.env.PORT || 4000;

// middleware
app.use(express.json());

// routing
app.use("/", router);

connectDB().then(() => {
  app.listen(port, () => {
    console.log("Server Running on port", port);
  });
});
