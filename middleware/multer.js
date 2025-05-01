const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const timestamp = new Date().getTime();
    console.log(file);
    const originalname = file.originalname;
    cb(null, `${timestamp}-${originalname}`);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 3 * 1000 * 1000, //3mb
  },
});

module.exports = upload;
