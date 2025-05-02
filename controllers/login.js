const connectDB = require("../config/database");
const { ObjectId } = require("mongodb");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  try {
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
    if (!isUsername) {
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

    console.log(process.env.ACCESS_TOKEN_SECRET);
    console.log(process.env.REFRESH_TOKEN_SECRET);

    // create jwt
    const accessToken = jwt.sign(
      { username: isUsername.username },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "60s" }
    );

    const refreshToken = jwt.sign(
      { username: isUsername.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    // kirim data ketika login berhasil
    res.json({
      message: "Login berhasil!",
      data: {
        accessToken,
        refreshToken,
      },
    });
  } catch (err) {
    console.log("Error:", err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

module.exports = login;
