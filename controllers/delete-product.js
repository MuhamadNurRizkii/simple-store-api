const connectDB = require("../config/database");
const { ObjectId } = require("mongodb");

const deleteProduct = async (req, res) => {
  const db = await connectDB();
  const id = req.params.id;
  const collection = db.collection("producst");

  await collection.deleteOne({
    _id: new ObjectId(id),
  });

  res.json({
    message: "Data berhasil dihapus!!",
  });
};

module.exports = deleteProduct;
