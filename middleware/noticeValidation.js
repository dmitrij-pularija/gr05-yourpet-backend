const Joi = require("joi");

const getError = require("../utilities/validationError");

const schema = {
	add: Joi.object({
		category: Joi.string().valid("sell", "lost-found", "for-free").required(),
		title: Joi.string().min(2).max(16).required(),
		birthday: Joi.string().pattern(/^\d{2}\.\d{2}\.\d{4}$/),
		name: Joi.string().min(2).max(16).required(),
		breed: Joi.string().min(2).max(16).required(),
		sex: Joi.string().valid("male", "female").required(),
		location: Joi.string()
			.pattern(/^[A-Za-z ]+$/)
			.min(2)
			.max(50)
			.when("category", {
				is: Joi.valid("sell", "lost-found", "for-free"),
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
			.max(120)
			.regex(/^[\s\S]*.*[^\s][\s\S]*$/),
	}),
	getCategory: Joi.object({
		category: Joi.string().valid("sell", "lost-found", "for-free"),
	}),
};

const addNoticeValidation = ({ body }, res, next) => {
	const { error } = schema.add.validate(body, { abortEarly: false });

	if (error) return res.status(400).json({ message: getError(error, "add") });

	next();
};
const getNoticeCategoryValidation = ({ category }, res, next) => {
	const { error } = getCategorySchema.validate({ category });
	if (error) {
		return res.status(400).json({
			error:
				'Invalid category, please select one of: ["sell", "lost-found", "for-free"]',
		});
	}
	next();
};

module.exports = { addNoticeValidation, getNoticeCategoryValidation };
