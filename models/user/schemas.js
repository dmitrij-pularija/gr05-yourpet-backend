const { Schema, model } = require("mongoose");

const user = new Schema(
  {
    name: {
      type: String,
      minlength: 3,
      maxlength: 20,
    },
    password: {
      type: String,
      minlength: 6,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    avatarURL: {
      type: String,
    },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: false }
);

user.post("save", (error, data, next) => {
  const field = Object.keys(error.keyPattern)[0];
  const message =
      field === "email"
      ? "Email in use"
      : error.message;
  const responseError = {
    status: 409,
    message: message,
  };
  return next(responseError);
});

const User = model("user", user);
module.exports = User;