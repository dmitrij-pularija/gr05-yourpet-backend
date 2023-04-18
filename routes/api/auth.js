const express = require("express");
const router = express.Router();

const authenticate = require("../../middleware/authenticate");
const upload = require("../../middleware/upload");

const {
  registerValidation,
  verifyValidation,
  loginValidation,
  subscriptionValidation,
  avatarValidation,
} = require("../../middleware/userValidation");

const authWrapper = require("../../decorators/authWrapper");

const {
  registr,
  verify,
  resendVerify,
  login,
  subscription,
  current,
  avatar,
  logout,
} = require("../../controllers/auth.js");

router.post("/register", registerValidation, authWrapper(registr));
router.get("/verify/:verificationToken", authWrapper(verify));
router.post("/verify", verifyValidation, authWrapper(resendVerify));
router.post("/login", loginValidation, authWrapper(login));
router.patch(
  "/subscription",
  authenticate,
  subscriptionValidation,
  authWrapper(subscription)
);
router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  avatarValidation,
  authWrapper(avatar)
);
router.get("/current", authenticate, authWrapper(current));
router.post("/logout", authenticate, authWrapper(logout));

module.exports = router;