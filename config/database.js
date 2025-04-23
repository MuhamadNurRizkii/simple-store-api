const { MongoClient } = require("mongodb");

const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri);
const dbName = process.env.DB_NAME;

async function connectDB() {
  try {
    const database = client.db(dbName);
    console.log("Connected to mongoDB");

    return database;
  } catch (error) {
    console.log("Error:", error);
  }
}

module.exports = connectDB;
