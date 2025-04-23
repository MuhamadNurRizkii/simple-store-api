const express = require("express");
const register = require("../controllers/register");
const login = require("../controllers/login");

const router = express.Router();

// routing to login
router.post("/login", login);

// routing to register
router.post("/register", register);

module.exports = router;
