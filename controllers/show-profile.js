const { ObjectId } = require("mongodb");
const connectDB = require("../config/database");

// fungsi get data profil
const showProfile = async (req, res) => {
  try {
    const db = await connectDB();
    const { id } = req.params;
    const collection = db.collection("users");
    console.log(id);

    if (!id) {
      return res.status(400).json({
        message: "Username tidak ditemukan!",
      });
    }

    let objectId;
    try {
      objectId = new ObjectId(id);
    } catch (err) {
      return res.status(400).json({
        message: "Format ID tidak valid!",
      });
    }

    const dataUser = await collection.findOne({ _id: objectId });

    if (!dataUser) {
      return res.status(404).json({
        message: "User tidak ditemukan!",
      });
    }

    res.json({
      data: {
        nama_lengkap: dataUser.nama_lengkap,
        username: dataUser.username,
      },
    });
  } catch (err) {
    console.log("Error:", err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

module.exports = showProfile;
