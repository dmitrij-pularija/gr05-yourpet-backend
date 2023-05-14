const Joi = require("joi");

const getError = require("../utilities/validationError");

const schema = {
	add: Joi.object({
		category: Joi.string().valid("sell", "lost/found", "In good hands").required(),
		title: Joi.string().min(2).max(120).required(),
		birthday: Joi.string().pattern(/^\d{2}\.\d{2}\.\d{4}$/),
		name: Joi.string().min(2).max(16).required(),
		breed: Joi.string().min(2).max(16).required(),
		sex: Joi.string().valid("male", "female").required(),
		location: Joi.string()
			.pattern(/^[A-Za-z ]+$/)
			.min(2)
			.max(16)
			.when("category", {
				is: Joi.valid("sell", "lost/found", "In good hands"),
				then: Joi.required(),
				otherwise: Joi.optional(),
			}),
		price: Joi.number()
			.min(0)
			.when("category", {
				is: "sell",
				then: Joi.number().min(1).required(),
				otherwise: Joi.optional(),
			}),
		comments: Joi.string()
			.min(8)
			.max(256)
			.regex(/^[\s\S]*.*[^\s][\s\S]*$/),
		image: Joi.string().min(2).max(120).required(),
		email: Joi.string().email(),
		phone: Joi.string().min(6).max(20),
		owner: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),	
	}),
	getCategory: Joi.object({
		category: Joi.string().valid("sell", "lost/found", "In good hands"),
	}),
};

const addNoticeValidation = ({ body }, res, next) => {
	const { error } = schema.add.validate(body, { abortEarly: false });

	if (error) return res.status(400).json({ message: getError(error, "add") });

	next();
};
const getNoticeCategoryValidation = ({ category }, res, next) => {
	const { error } = schema.getCategory.validate({ category });
	if (error) {
		return res.status(400).json({
			error:
				'Invalid category, please select one of: ["sell", "lost-found", "for-free"]',
		});
	}
	next();
};

module.exports = { addNoticeValidation, getNoticeCategoryValidation };
