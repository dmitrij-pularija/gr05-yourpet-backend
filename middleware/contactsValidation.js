const Joi = require("joi");

const getError = require("../utilities/validationError");

const schema = {
  add: Joi.object({
    name: Joi.string().min(3).max(20).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().min(6).max(20).trim().required(),
  }).unknown(false),
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
  const { error } = schema.add.validate(body, { abortEarly: false });

  if (error) return res.status(400).json({ message: getError(error, "add") });

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

module.exports = { addValidation, editValidation, favValidation };