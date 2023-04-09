const { Schema, model } = require("mongoose");

const contacts = new Schema(
  {
    name: {
      type: String,
      minlength: 3,
      maxlength: 20,
      unique: true,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      required: [true, "Set email for contact"],
      unique: true,
    },
    phone: {
      type: String,
      minlength: 6,
      maxlength: 20,
      required: [true, "Set phone for contact"],
      unique: true,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false, timestamps: false }
);

contacts.post("save", (error, data, next) => {
  const field = Object.keys(error.keyPattern)[0];
  const message =
    field === "name"
      ? "Name must be unique."
      : field === "email"
      ? "Email must be unique."
      : field === "phone"
      ? "Phone must be unique."
      : error.message;
  const responseError = {
    status: 400,
    message: message,
  };
  return next(responseError);
});

const Contacts = model("contacts", contacts);

module.exports = Contacts;