const connectDB = require("../config/database");

const createProduct = async (req, res) => {
  const db = await connectDB();
  const collection = db.collection("products");
  const { nama, harga, stok, kategori } = req.body;

  if (!nama || !harga || !stok || !kategori) {
    return res.status(400).json({
      message: "Semua field harus diisi!!",
    });
  }

  await collection.insertOne({
    nama,
    harga,
    stok,
    kategori,
  });

  res.status(201).json({
    message: "Data baru berhasil ditambahkan!!",
    data: {
      nama,
      harga,
      stok,
      kategori,
    },
  });
};

module.exports = createProduct;
