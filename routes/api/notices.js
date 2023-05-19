const express = require("express");
const router = express.Router();

const ctrlWrapper = require("../../decorators/ctrlWrapper");
const authenticate = require("../../middleware/authenticate");

const {
	add,
	getFavorite,
	addFavorite,
	getCategory,
	// getOne,
	// getByTitle,
	getByOwnerId,
	delFavourite,
	del,
} = require("../../controllers/notices");

const {
	addNoticeValidation,
	getNoticeCategoryValidation,
} = require("../../middleware/noticeValidation");

router.get("/", getNoticeCategoryValidation, ctrlWrapper(getCategory));
// router.get("/:id", ctrlWrapper(getOne));
// router.get("/find", ctrlWrapper(getByTitle));
router.get("/owner", authenticate, ctrlWrapper(getByOwnerId));
router.post("/", authenticate, addNoticeValidation, ctrlWrapper(add));
router.delete("/:id", authenticate, ctrlWrapper(del));
router.get("/favorite/owner", authenticate, ctrlWrapper(getFavorite));
router.post("/favorite/:id", authenticate, ctrlWrapper(addFavorite));
router.delete("/favorite/:id", authenticate, ctrlWrapper(delFavourite));

module.exports = router;
