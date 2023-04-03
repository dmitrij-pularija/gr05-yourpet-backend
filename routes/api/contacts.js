const express = require("express");
const router = express.Router();

const { list, get, add, del, edit } = require("../../controllers/contacts.js");
const {
  addValidation,
  editValidation,
} = require("../../middleware/validation.js");

router.get("/", list);
router.get("/:contactId", get);
router.post("/", addValidation, add);
router.delete("/:contactId", del);
router.put("/:contactId", editValidation, edit);

module.exports = router;