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
  addFavorite,
  getNoticeById,
  delFavorite,
} = require("../../controllers/notices");

const {
  addNoticeValidation,
  getNoticeCategoryValidation,
} = require("../../middleware/noticeValidation");

router.get(
  "/:category",
  getNoticeCategoryValidation,
  privateWrapper(authenticate),
  ctrlWrapper(selecQuery)
);
router.get("/id/:id", ctrlWrapper(getNoticeById));
router.post(
  "/",
  authenticate,
  uploads.pets.single("pet"),
  addNoticeValidation,
  ctrlWrapper(addNotice)
);
router.delete("/:id", authenticate, ctrlWrapper(delNotice));
router.post("/favorite/:id", authenticate, ctrlWrapper(addFavorite));
router.delete("/favorite/:id", authenticate, ctrlWrapper(delFavorite));

module.exports = router;
