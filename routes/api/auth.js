const express = require("express");
const router = express.Router();

const authenticate = require("../../middleware/authenticate");
const {
  registerValidation,
  loginValidation,
  subscriptionValidation,
} = require("../../middleware/userValidation");

const authWrapper = require("../../decorators/authWrapper");

const {
  registr,
  login,
  subscription,
  current,
  logout,
} = require("../../controllers/auth.js");

router.post("/register", registerValidation, authWrapper(registr));
router.post("/login", loginValidation, authWrapper(login));
router.patch(
  "/subscription",
  authenticate,
  subscriptionValidation,
  authWrapper(subscription)
);
router.get("/current", authenticate, authWrapper(current));
router.post("/logout", authenticate, authWrapper(logout));

module.exports = router;