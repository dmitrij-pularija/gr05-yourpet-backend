const express = require("express");
const router = express.Router();

const authenticate = require("../../middleware/authenticate");
const uploads = require("../../middleware/upload");

const {
	registerValidation,
	// verifyValidation,
	loginValidation,
	updateValidation,
	// avatarValidation,
} = require("../../middleware/userValidation");

const authWrapper = require("../../decorators/authWrapper");

const {
	registr,
	// verify,
	// resendVerify,
	login,
	update,
	current,
	avatar,
	logout,
} = require("../../controllers/auth.js");

router.post("/register", registerValidation, authWrapper(registr));
// router.get("/verify/:verificationToken", authWrapper(verify));
// router.post("/verify", verifyValidation, authWrapper(resendVerify));
router.post("/login", loginValidation, authWrapper(login));
router.patch("/update", authenticate, updateValidation, authWrapper(update));

router.patch(
	"/avatars",
	authenticate,
	uploads.avatars.single("avatar"),
	authWrapper(avatar)
);
router.get("/current", authenticate, authWrapper(current));
router.post("/logout", authenticate, authWrapper(logout));

module.exports = router;
