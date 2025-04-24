const connectDB = require("../config/database");
const { ObjectId } = require("mongodb");
const bcrypt = require("bcrypt");

const login = async (req, res) => {
  // konek ke database
  const db = await connectDB();

  // ambil input value dari request body
  const { username, password } = req.body;
  // pilih collection users
  const collection = db.collection("users");

  // validasi jika username dan password tidak diisi / tidak ada
  if (!username || !password) {
    return res.status(400).json({
      message: "username atau password wajib diisi!",
    });
  }

  // ambil data username dari database
  const isUsername = await collection.findOne({ username });
  // validasi jika usernam tidak ada di database
  if (!username) {
    return res.status(400).json({
      message: "Username / Password salah!!",
    });
  }

  // validasi jika password salah
  const isPassword = await bcrypt.compare(password, isUsername.password);
  if (!isPassword) {
    return res.status(400).json({
      message: "Username / Password salah!!",
    });
  }

  // kirim data ketika login berhasil
  res.json({
    message: "Login berhasil!",
    data: {
      _id: new ObjectId(isUsername._id),
      username,
    },
  });
};

module.exports = login;
