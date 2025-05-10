const connectDB = require("../config/database");

// bikin fungsi untuk membuat data product baru
const createProduct = async (req, res) => {
  // konek ke database
  const db = await connectDB();
  // pilih collection products
  const collection = db.collection("products");
  // ambil input value dari request body
  const { nama, harga, stok, kategori } = req.body;
  const image = req.file ? req.file.filename : null;
  console.log(image);
  console.log(nama);

  // validasi jika input value-nya kosong / belum diisi
  if (!nama || !harga || !stok || !kategori) {
    return res.status(400).json({
      message: "Semua field harus diisi!!",
    });
  }

  // masukkan semua data product ke database
  await collection.insertOne({
    nama,
    harga: Number(harga),
    stok: Number(stok),
    kategori,
    image,
  });

  // kirim pesan bahwa data baru berhasil dibuat
  res.status(201).json({
    message: "Data baru berhasil ditambahkan!!",
    data: {
      nama,
      harga: Number(harga),
      stok: Number(stok),
      kategori,
      image,
    },
  });
};

// export createProduct
module.exports = createProduct;
