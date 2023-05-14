const express = require("express");
const router = express.Router();

// const ctrlWrapper = require("../../decorators/ctrl");
const ctrl = require("../../decorators/ctrlWrap");
const authenticate = require("../../middleware/authenticate");
const { listPets, add, del } = require("../../controllers/pets.js");
const uploadCloud = require("../../middleware/upload");

const {
  addValidation,
  isValidId,
} = require("../../middleware/petsValidation.js");

router.get("/", authenticate, listPets);
router.post(
  "/",
  authenticate,
  addValidation,
  uploadCloud.single("image"),
  ctrl(add)
);
router.delete("/:id", authenticate, isValidId, ctrl(del));

module.exports = router;
