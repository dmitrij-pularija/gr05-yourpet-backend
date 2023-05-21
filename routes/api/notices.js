const express = require("express");
const router = express.Router();

const ctrlWrapper = require("../../decorators/ctrlWrapper");
const privateWrapper = require("../../decorators/privateWrapper");
const authenticate = require("../../middleware/authenticate");
const uploads = require("../../middleware/upload");

const {
	addNotice,
	delNotice,
	selecQuery,
	// getFavorite,
	addFavorite,
	// getCategory,
	getNoticeById,
	// getByTitle,
	// getByOwnerId,
	delFavorite,
} = require("../../controllers/notices");

const {
	addNoticeValidation,
	getNoticeCategoryValidation,
} = require("../../middleware/noticeValidation");

// private(authenticate),
router.get("/:category", getNoticeCategoryValidation, privateWrapper(authenticate), ctrlWrapper(selecQuery));

// router.get("/", getNoticeCategoryValidation, ctrlWrapper(getCategory));
router.get("/id/:id", ctrlWrapper(getNoticeById));
// // router.get("/find", ctrlWrapper(getByTitle));
// router.get("/owner", authenticate, ctrlWrapper(getByOwnerId));
// addNoticeValidation,
router.post("/", authenticate,  uploads.pets.single("pet"), ctrlWrapper(addNotice));
router.delete("/:id", authenticate, ctrlWrapper(delNotice));
// router.get("/favorite/owner", authenticate, ctrlWrapper(getFavorite));
router.post("/favorite/:id", authenticate, ctrlWrapper(addFavorite));
router.delete("/favorite/:id", authenticate, ctrlWrapper(delFavorite));

module.exports = router;
