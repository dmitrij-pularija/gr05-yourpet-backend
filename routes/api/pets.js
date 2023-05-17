const express = require("express");
const router = express.Router();

// const ctrlWrapper = require("../../decorators/ctrl");
const ctrl = require("../../decorators/ctrlWrap");
const authenticate = require("../../middleware/authenticate");
const {
  listPets,
  add,
  del,
  addImagePets,
  delImage,
} = require("../../controllers/pets.js");
const uploads = require("../../middleware/upload");

const {
  addValidation,
  isValidId,
} = require("../../middleware/petsValidation.js");

router.get("/", authenticate, listPets);

router.post("/", authenticate, addValidation, ctrl(add));

router.patch(
  "/add",
  authenticate,
  uploads.pets.single("pet"),
  ctrl(addImagePets)
);

router.delete("/delete-photo/:id", authenticate, ctrl(delImage));

router.delete("/:id", authenticate, isValidId, ctrl(del));

module.exports = router;
