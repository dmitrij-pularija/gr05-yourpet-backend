const express = require("express");
const router = express.Router();

const ctrlWrapper = require("../../decorators/ctrlWrapper");

const {
  list,
  get,
  add,
  del,
  edit,
  fav,
} = require("../../controllers/contacts.js");
const {
  addValidation,
  editValidation,
  favValidation,
} = require("../../middleware/validation.js");

router.get("/", ctrlWrapper(list));
router.get("/:contactId", ctrlWrapper(get));
router.post("/", addValidation, ctrlWrapper(add));
router.delete("/:contactId", ctrlWrapper(del));
router.put("/:contactId", editValidation, ctrlWrapper(edit));
router.patch("/:contactId/favorite", favValidation, ctrlWrapper(fav));

module.exports = router;