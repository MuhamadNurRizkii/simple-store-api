const connectDB = require("../config/database");
const { ObjectId } = require("mongodb");

const updateProduct = async (req, res) => {
  const id = req.params.id;
  const db = await connectDB();
  const collection = db.collection("products");
  const { nama, harga, stok, kategori } = req.body;

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
