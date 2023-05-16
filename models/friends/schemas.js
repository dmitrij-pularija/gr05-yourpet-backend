const { Schema, model } = require("mongoose");

const friends = new Schema(
	{
		title: {
			type: String,
			required: [true, "Set title"],
		},
		url: {
			type: String,
		},
		addressUrl: {
			type: String,
		},
		imageUrl: {
			type: String,
			default: false,
		},
		address: {
			type: String,
			default: null,
		},
		workDays: {
			type: Array,
			default: null,
		},
		phone: {
			type: String,
			default: null,
		},
		email: { type: String },
	},
	{ versionKey: false, timestamps: false }
);
friends.post("save", (error, data, next) => {
	error.status = 400;
	next();
});

const FriendModel = model("friend", friends);

module.exports = FriendModel;
