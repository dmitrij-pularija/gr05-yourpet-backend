const Joi = require("joi");

const getError = require("../utilities/validationError");

const schema = {
  register: Joi.object({
    name: Joi.string().min(3).max(20).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(20).required(),
    subscription: Joi.string().valid("starter", "pro", "business"),
  }).unknown(false),
  login: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(20).required(),
  }).unknown(false),
  subscription: Joi.object({
    subscription: Joi.string().valid("starter", "pro", "business").required(),
  }).unknown(false),
};

const registerValidation = ({ body }, res, next) => {
  const { error } = schema.register.validate(body);

  if (error)
    return res.status(400).json({ message: getError(error, "register") });

  next();
};

const loginValidation = ({ body }, res, next) => {
  const { error } = schema.login.validate(body);

  if (error) return res.status(400).json({ message: getError(error, "login") });

  next();
};

const subscriptionValidation = ({ body }, res, next) => {
  const { error } = schema.subscription.validate(body);

  if (error)
    return res.status(400).json({ message: getError(error, "register") });

  next();
};

module.exports = {
  registerValidation,
  loginValidation,
  subscriptionValidation,
};