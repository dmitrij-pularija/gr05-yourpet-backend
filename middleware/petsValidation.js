const { isValidObjectId } = require("mongoose");
const Joi = require("joi");
const formidable = require("formidable");

const schema = {
  add: Joi.object({
    name: Joi.string().min(2).max(16).required().messages({
      "any.required": "Please provide a name for the pet",
      "string.min": "Name must have at least 2 characters",
      "string.max": "Name cannot exceed 16 characters",
      "string.pattern.base": "Name can only contain letters",
    }),
    birthday: Joi.string()
      .pattern(/^\d{2}\.\d{2}\.\d{4}$/)
      .required()
      .messages({
        "any.required": "Please specify the pet's date of birth",
        "string.pattern.base": "Invalid date format (must be dd.mm.yyyy)",
      }),
    breed: Joi.string().min(2).max(16).required().messages({
      "any.required": "Please specify the pet's breed",
      "string.min": "Breed must have at least 2 characters",
      "string.max": "Breed cannot exceed 16 characters",
      "string.pattern.base": "Breed can only contain letters",
    }),
    comments: Joi.string().min(8).max(320).allow("").messages({
      "string.min": "Comments must have at least 8 characters",
      "string.max": "Comments cannot exceed 320 characters",
    }),
    petsURL: Joi.string().allow("").optional(),
  }).options({ abortEarly: false }),
};

const addValidation = ({ body }, req, res, next) => {
  const form = new formidable.IncomingForm();

  form.parse(req, (err, fields) => {
    if (err) {
      console.error("Failed to process form data:", err);
      return res.status(400).json({ errors: ["Failed to process form data"] });
    }
    const { error } = schema.add.validate(body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({ errors });
    }

    console.log("Valid Request Body:", fields);
    next();
  });
};

const isValidId = (req, res, next) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    return res.status(400).json({ message: "Pet not found" });
  }
  next();
};

module.exports = { addValidation, isValidId };
