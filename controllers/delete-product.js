const connectDB = require("../config/database");
const { ObjectId } = require("mongodb");

// fungsi untuk menghapus data product berdasarkan id
const deleteProduct = async (req, res) => {
  // konek ke database
  const db = await connectDB();
  // ambil id dari params url
  const id = req.params.id;
  // pilih collection products
  const collection = db.collection("products");

  // query untuk menghapus data
  await collection.deleteOne({
    _id: new ObjectId(id),
  });

  // kirim pesan ketika data berhasil dihapus
  res.json({
    message: "Data berhasil dihapus!!",
  });
};

module.exports = deleteProduct;
