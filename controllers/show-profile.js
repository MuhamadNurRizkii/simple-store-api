const { ObjectId } = require("mongodb");
const connectDB = require("../config/database");

// fungsi get data profil
const showProfile = async (req, res) => {
  const db = await connectDB();
  const { id } = req.params;
  const collection = db.collection("users");
  console.log(id);

  if (!id) {
    return res.status(400).json({
      message: "Username tidak ditemukan!",
    });
  }

  const dataUser = await collection.findOne({ _id: new ObjectId(id) });

  res.json({
    data: {
      nama_lengkap: dataUser.nama_lengkap,
      username: dataUser.username,
    },
  });
};

module.exports = showProfile;
