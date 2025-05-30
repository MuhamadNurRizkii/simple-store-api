const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).json({
      message: "Token tidak ditemukan!",
    });
  }
  console.log(authHeader);
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res
        .status(403)
        .json({ message: "Token sudah invalid atau kadaluawarsa!!" });
    }

    req.user = user;
    next();
  });
};

module.exports = verifyJWT;
