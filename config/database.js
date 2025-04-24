const { MongoClient } = require("mongodb");

// url mongodb
const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri);
const dbName = process.env.DB_NAME;

// fungsi untuk konek ke database
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
