const express = require("express");
const router = express.Router();

const ctrl = require("../../decorators/ctrlWrap");
const authenticate = require("../../middleware/authenticate");
const { listPets, del, addImageAndPet } = require("../../controllers/pets.js");
const uploads = require("../../middleware/upload");

const {
  addValidation,
  isValidId,
} = require("../../middleware/petsValidation.js");

router.get("/", authenticate, listPets);

router.post(
  "/",
  authenticate,
  addValidation,
  uploads.pets.single("pet"),
  ctrl(addImageAndPet)
);

router.delete("/:id", authenticate, isValidId, ctrl(del));

module.exports = router;
