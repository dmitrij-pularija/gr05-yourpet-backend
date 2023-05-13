const Joi = require("joi");
const { unlinkSync } = require("fs");
const getError = require("../utilities/validationError");

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const passRegexp = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{6,16}$/;

const schema = {
	register: Joi.object({
		name: Joi.string().min(3).max(20),
		email: Joi.string().email().pattern(emailRegexp).required(),
		password: Joi.string().pattern(passRegexp).required(),
		subscription: Joi.string().valid("starter", "pro", "business"),
	}).unknown(false),
	verify: Joi.object({
		email: Joi.string().email().pattern(emailRegexp).required(),
	}).unknown(false),
	login: Joi.object({
		email: Joi.string().email().pattern(emailRegexp).required(),
		password: Joi.string().pattern(passRegexp).required(),
	}).unknown(false),
	subscription: Joi.object({
		subscription: Joi.string()
			.valid("starter", "pro", "business")
			.required(),
	}).unknown(false),
	avatar: Joi.object({
		fieldname: Joi.string().valid("avatar").required(),
		mimetype: Joi.string()
			.valid("image/jpeg", "image/png", "image/jpeg", "image/gif")
			.required()
			.messages({ "any.only": "The file format must be jpg or png" }),
		size: Joi.number()
			.max(1 * 1024 * 1024)
			.required()
			.messages({ "number.max": "The file size must not exceed 1 MB" }),
	})
		.required()
		.unknown(true),
};

const registerValidation = ({ body }, res, next) => {
	const { error } = schema.register.validate(body);

	if (error)
		return res.status(400).json({ message: getError(error, "register") });

	next();
};

const verifyValidation = ({ body }, res, next) => {
	const { error } = schema.verify.validate(body);

	if (error)
		return res.status(400).json({ message: getError(error, "verify") });

	next();
};

const loginValidation = ({ body }, res, next) => {
	const { error } = schema.login.validate(body);

	if (error)
		return res.status(400).json({ message: getError(error, "login") });

	next();
};

const subscriptionValidation = ({ body }, res, next) => {
	const { error } = schema.subscription.validate(body);

	if (error)
		return res.status(400).json({ message: getError(error, "register") });

	next();
};

const avatarValidation = ({ file }, res, next) => {
	const { error } = schema.avatar.validate(file);
	if (error) {
		unlinkSync(file.path);
		return res.status(400).json({ message: getError(error, "avatar") });
	}
	next();
};

module.exports = {
	registerValidation,
	verifyValidation,
	loginValidation,
	subscriptionValidation,
	avatarValidation,
};
