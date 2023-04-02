const Joi = require("joi");

const schema = {
  add: Joi.object({
    name: Joi.string().min(3).max(20).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().min(6).max(20).trim().required(),
  }).unknown(false),
  edit: Joi.object({
    name: Joi.string().alphanum().min(3).max(20),
    email: Joi.string().email(),
    phone: Joi.string().min(6).max(20),
  })
    .or("name", "phone", "email")
    .unknown(false),
};

const getError = (error, type) => {
  const requiredFields = error.details
    .filter((detail) => detail.type === "any.required")
    .map((detail) => detail.context.label);
  const fieldsString = error.details
    .filter((detail) => detail.type.startsWith("string."))
    .map((detail) => detail.message);
  const unknownField = error.details
    .filter((detail) => detail.type === "object.unknown")
    .map((detail) => detail.message);

  if (unknownField.length > 0) return `Fields: ${unknownField}`;
  if (requiredFields.length > 0)
    return `Missing required ${requiredFields} field`;
  if (fieldsString.length > 0) return `Incorrect field values: ${fieldsString}`;

  if (type === "edit") {
    const keys = Object.keys(error.details[0].context.value);
    if (keys.length === 0) return "At least one field is required";
  }
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

module.exports = { addValidation, editValidation };