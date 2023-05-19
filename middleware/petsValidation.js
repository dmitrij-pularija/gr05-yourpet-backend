const Joi = require("joi");
const { isValidObjectId } = require("mongoose");
const getError = require("../utilities/validationError");

const schema = {
  add: Joi.object({
    name: Joi.string().min(2).max(16).required(),
    birthday: Joi.string()
      .pattern(/^\d{2}\.\d{2}\.\d{4}$/)
      .required(),
    breed: Joi.string().min(2).max(16).required(),
    photoURL: Joi.string(),
    comments: Joi.string().min(8).max(120),
    owner: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/),
  }),
  edit: Joi.object({
    name: Joi.string().min(3).max(20),
    email: Joi.string().email(),
    phone: Joi.string().min(6).max(20),
  })
    .or("name", "phone", "email")
    .unknown(false),
  fav: Joi.object({
    favorite: Joi.boolean().required(),
  }).unknown(false),
};

const addValidation = ({ body }, res, next) => {
  if (Object.keys(body).length === 0) {
    return res.status(400).json({ message: "missing fields" });
  }
  const { error } = schema.add.validate(body, { abortEarly: false });
  if (error) {
    return res.status(400).json({
      message: `missing required ${error.details[0].context.label} field`,
    });
  }
  next();
};

const editValidation = ({ body }, res, next) => {
  const { error } = schema.edit.validate(body);

  if (error) return res.status(400).json({ message: getError(error, "edit") });

  next();
};

const favValidation = ({ body }, res, next) => {
  const { error } = schema.fav.validate(body);

  if (error) return res.status(400).json({ message: getError(error, "fav") });

  next();
};

const isValidId = (req, res, next) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    return res.status(400).json({ message: "Pet not found" });
  }
  next();
};

module.exports = { addValidation, editValidation, favValidation, isValidId };
