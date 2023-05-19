const express = require("express");
const router = express.Router();

const authenticate = require("../../middleware/authenticate");

const {
	registerValidation,
	loginValidation,
} = require("../../middleware/userValidation");

const authWrapper = require("../../decorators/authWrapper");

const { registr, login, logout } = require("../../controllers/auth.js");

router.post("/register", registerValidation, authWrapper(registr));
router.post("/login", loginValidation, authWrapper(login));
router.post("/logout", authenticate, authWrapper(logout));

module.exports = router;
