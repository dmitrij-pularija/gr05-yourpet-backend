const express = require("express");
const router = express.Router();

// const ctrlWrapper = require("../../decorators/ctrl");
const ctrl = require("../../decorators/ctrlWrap");
const authenticate = require("../../middleware/authenticate");
const {
  listPets,
  del,
  delImage,
  addImageAndPet,
} = require("../../controllers/pets.js");
const uploads = require("../../middleware/upload");

const {
  addValidation,
  isValidId,
} = require("../../middleware/petsValidation.js");

router.get("/", authenticate, listPets);

router.patch(
  "/update",
  authenticate,
  addValidation,
  uploads.pets.single("pet"),
  ctrl(addImageAndPet)
);

router.delete("/delete-photo/:id", authenticate, ctrl(delImage));

router.delete("/:id", authenticate, isValidId, ctrl(del));

module.exports = router;
