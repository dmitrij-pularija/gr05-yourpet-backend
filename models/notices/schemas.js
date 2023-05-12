const { Schema, model } = require("mongoose");

const contacts = new Schema(
  {
    name: {
      type: String,
      minlength: 3,
      maxlength: 20,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      required: [true, "Set email for contact"],
    },
    phone: {
      type: String,
      minlength: 6,
      maxlength: 20,
      required: [true, "Set phone for contact"],
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
  error.status = 400;
  next();
});

const Contacts = model("contacts", contacts);

module.exports = Contacts;