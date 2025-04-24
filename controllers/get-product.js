const connectDB = require("../config/database");

// membat fungsi untuk mengambil semua data dari database
const getProduct = async (req, res) => {
  // konek ke database
  const db = await connectDB();
  // pilih collection products
  const collection = db.collection("products");
  // query untuk mengambil semua data dari database
  const product = await collection.find().toArray();

  // validasi jika data product tidak ada
  if (!product) {
    return res.status(400).json({
      message: "Produk gagal diambil!",
    });
  }

  // kirim pesan dan tampilkan semua data
  res.json({
    message: "Data berhasil diambil!",
    data: product,
  });
};

module.exports = getProduct;
