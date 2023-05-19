const express = require("express");
const router = express.Router();

const authenticate = require("../../middleware/authenticate");
const uploads = require("../../middleware/upload");
const authWrapper = require("../../decorators/authWrapper");

const { updateValidation } = require("../../middleware/userValidation");
const { update, avatar, current } = require("../../controllers/users");

router.get("/current", authenticate, authWrapper(current));
router.patch("/update", authenticate, updateValidation, authWrapper(update));
router.patch(
	"/avatars",
	authenticate,
	uploads.avatars.single("avatar"),
	authWrapper(avatar)
);
module.exports = router;
