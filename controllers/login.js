const connectDB = require("../config/database");
const { ObjectId } = require("mongodb");
const bcrypt = require("bcrypt");

const login = async (req, res) => {
  const db = await connectDB();
  const { username, password } = req.body;
  const collection = db.collection("users");

  if (!username || !password) {
    return res.status(400).json({
      message: "username atau password wajib diisi!",
    });
  }

  const isUsername = await collection.findOne({ username });
  if (!username) {
    return res.status(400).json({
      message: "Username / Password salah!!",
    });
  }

  const isPassword = await bcrypt.compare(password, isUsername.password);
  if (!isPassword) {
    return res.status(400).json({
      message: "Username / Password salah!!",
    });
  }

  res.json({
    message: "Login berhasil!",
    data: {
      _id: new ObjectId(isUsername._id),
      username,
    },
  });
};

module.exports = login;
