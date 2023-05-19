const Joi = require("joi");
// const { unlinkSync } = require("fs");
const getError = require("../utilities/validationError");

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const passRegexp = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{6,16}$/;

const schema = {
	register: Joi.object({
		name: Joi.string().min(3).max(20),
		email: Joi.string().email().pattern(emailRegexp).required(),
		password: Joi.string().pattern(passRegexp).required(),
		// subscription: Joi.string().valid("starter", "pro", "business"),
	}).unknown(false),
	login: Joi.object({
		email: Joi.string().email().pattern(emailRegexp).required(),
		password: Joi.string().pattern(passRegexp).required(),
	}).unknown(false),
	update: Joi.object({
		name: Joi.string().min(3).max(20),
		email: Joi.string().email().pattern(emailRegexp).required(),
		birthday: Joi.string().max(10),
		phone: Joi.string().max(13),
		city: Joi.string(),
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

// const verifyValidation = ({ body }, res, next) => {
// 	const { error } = schema.verify.validate(body);

// 	if (error)
// 		return res.status(400).json({ message: getError(error, "verify") });

// 	next();
// };

const loginValidation = ({ body }, res, next) => {
	const { error } = schema.login.validate(body);

	if (error)
		return res.status(400).json({ message: getError(error, "login") });

	next();
};

const updateValidation = ({ body }, res, next) => {
	const { error } = schema.update.validate(body);

	if (error)
		return res.status(400).json({ message: getError(error, "register") });

	next();
};

// const avatarValidation = (req, res, next) => {//
// 	const { error } = schema.avatar.validate(req.file);//
// 	if (error) {
// 		return res.status(400).json({ message: getError(error, "avatar") });
// 	}
// 	next();
// };

module.exports = {
	registerValidation,
	// verifyValidation,
	loginValidation,
	updateValidation,
	// avatarValidation,
};
