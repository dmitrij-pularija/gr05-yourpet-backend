const { Schema, model } = require("mongoose");

const noticeSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		name: {
			type: String,
			minLength: 2,
			maxLength: 16,
			required: true,
		},
		birthday: {
			type: String,
			default: "00.00.0000",
			required: true,
		},
		breed: {
			type: String,
			minLength: 2,
			maxLength: 16,
			required: true,
		},
		location: {
			type: String,
			required: true,
		},
		sex: {
			type: String,
			enum: ["male", "female"],
			required: [true, "Choose the sex of the animal, male or female"],
		},
		category: {
			type: String,
			enum: ["sell", "lost/found", "In good hands"],
			required: true,
		},
		price: {
			type: String,
			default: "",
		},
		comments: {
			type: String,
		},
		image: {
			type: String,
		},
		owner: {
			type: Schema.Types.ObjectId,
			ref: "user",
		},
		favorite: {
			type: [Schema.Types.ObjectId],
			default: [],
		  },
		email: {
			type: String,
			default: "",
		},
		phone: {
			type: String,
			default: "",
		},
	},
	{ versionKey: false, timestamps: true }
);

noticeSchema.post("save", (error, data, next) => {
	error.status = 400;
	next();
});

const NoticeModel = model("notice", noticeSchema);
module.exports = NoticeModel;
