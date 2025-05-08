const express = require("express");
const register = require("../controllers/register");
const login = require("../controllers/login");
const getProduct = require("../controllers/get-product");
const createProduct = require("../controllers/create-product");
const updateProduct = require("../controllers/update-product");
const deleteProduct = require("../controllers/delete-product");
const showProfile = require("../controllers/show-profile.js");
const verifyJWT = require("../middleware/verify-token");
const upload = require("../middleware/multer.js");

const router = express.Router();

// routing to login
router.post("/login", login);

// routing to register
router.post("/register", register);

// routing to profile
router.get("/profile/:id", verifyJWT, showProfile);

// routing to get products
router.get("/products", verifyJWT, getProduct);

// routing to create products
router.post("/products", verifyJWT, upload.single("image"), createProduct);

// routing to update products
router.patch("/products/:id", verifyJWT, updateProduct);

// routing to delete producst
router.delete("/products/:id", verifyJWT, deleteProduct);

module.exports = router;
