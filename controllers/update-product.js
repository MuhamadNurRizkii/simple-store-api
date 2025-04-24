const connectDB = require("../config/database");
const { ObjectId } = require("mongodb");

// fungsi untuk update data product berdasarkan id
const updateProduct = async (req, res) => {
  // ambil id dari params url
  const id = req.params.id;
  // konek ke database
  const db = await connectDB();
  // pilih collection products
  const collection = db.collection("products");
  // ambil input value dari request body
  const { nama, harga, stok, kategori } = req.body;

  // query untuk update product
  await collection.updateOne(
    { _id: new ObjectId(id) },
    {
      $set: {
        nama,
        harga,
        stok,
        kategori,
      },
    }
  );

  // kirim pesan dan data ketika berhasil mengupdate product
  res.json({
    message: "Data berhasil diupdate!",
    data: {
      nama,
      harga,
      stok,
      kategori,
    },
  });
};

module.exports = updateProduct;
