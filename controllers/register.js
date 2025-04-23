const { measureMemory } = require("vm");
const connectDB = require("../config/database");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  const db = await connectDB();
  const { nama_lengkap, username, password, confirm_password } = req.body;
  const collection = db.collection("users");

  const isName = await collection.findOne({ username: username });

  if (!nama_lengkap || !username || !password || !confirm_password) {
    return res.status(400).json({
      message: "Semua field harus diisi!!",
    });
  }

  if (isName) {
    return res.status(400).json({
      message: "Username sudah digunakan!",
    });
  }

  if (confirm_password !== password) {
    return res.status(400).json({
      message: "konfirmasi password salah!",
    });
  }

  const hashPassword = bcrypt.hashSync(password, 5);

  await collection.insertOne({
    nama_lengkap,
    username,
    password: hashPassword,
  });

  res.status(201).json({
    message: "Register Berhasil!!",
    data: {
      nama_lengkap,
      username,
    },
  });
};

module.exports = register;
