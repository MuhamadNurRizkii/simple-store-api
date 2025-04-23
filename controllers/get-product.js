const connectDB = require("../config/database");

const getProduct = async (req, res) => {
  const db = await connectDB();
  const collection = db.collection("products");
  const product = await collection.find().toArray();

  if (!product) {
    return res.status(400).json({
      message: "Produk gagal diambil!",
    });
  }

  res.json({
    message: "Data berhasil diambil!",
    data: product,
  });
};

module.exports = getProduct;
