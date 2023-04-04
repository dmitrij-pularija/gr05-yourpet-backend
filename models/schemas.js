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
  },
  { versionKey: false, timestamps: true }
);

const Contacts = model("contacts", contacts);

module.exports = Contacts;