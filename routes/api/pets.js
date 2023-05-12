const express = require("express");
const router = express.Router();

const ctrlWrapper = require("../../decorators/ctrlWrapper");
const authenticate = require("../../middleware/authenticate");

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
} = require("../../middleware/contactsValidation.js");

router.get("/", authenticate, ctrlWrapper(list));
router.get("/:contactId", authenticate, ctrlWrapper(get));
router.post("/", authenticate, addValidation, ctrlWrapper(add));
router.delete("/:contactId", authenticate, ctrlWrapper(del));
router.put("/:contactId", authenticate, editValidation, ctrlWrapper(edit));
router.patch(
  "/:contactId/favorite",
  authenticate,
  favValidation,
  ctrlWrapper(fav)
);

module.exports = router;