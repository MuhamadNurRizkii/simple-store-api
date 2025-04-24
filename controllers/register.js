const { measureMemory } = require("vm");
const connectDB = require("../config/database");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  // konek ke database
  const db = await connectDB();
  // ambil input value dari request body
  const { nama_lengkap, username, password, confirm_password } = req.body;
  // pilih collection users
  const collection = db.collection("users");

  // ambil username dari database
  const isName = await collection.findOne({ username: username });

  // validasi jika input value tidak diisi
  if (!nama_lengkap || !username || !password || !confirm_password) {
    return res.status(400).json({
      message: "Semua field harus diisi!!",
    });
  }

  // validasi jika username sudah ada di database
  if (isName) {
    return res.status(400).json({
      message: "Username sudah digunakan!",
    });
  }

  // validasi jika confirm password berbeda dengan password
  if (confirm_password !== password) {
    return res.status(400).json({
      message: "konfirmasi password salah!",
    });
  }

  // hashing password sebelum masuk ke database
  const hashPassword = bcrypt.hashSync(password, 5);

  // masukkan semua data ketika sudah melewati beberapa validasi
  await collection.insertOne({
    nama_lengkap,
    username,
    password: hashPassword,
  });

  // kirim pesan dan data bahwa data baru berhasil di buat
  res.status(201).json({
    message: "Register Berhasil!!",
    data: {
      nama_lengkap,
      username,
    },
  });
};

module.exports = register;
