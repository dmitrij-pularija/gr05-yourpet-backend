const { Schema, model } = require("mongoose");
const moment = require("moment");

const petSchema = new Schema(
  {
    name: {
      type: String,
      minLength: 2,
      maxLength: 16,
      required: true,
    },
    birthday: {
      type: String,
      get: function (v) {
        return moment(v, "YYYY-MM-DD").format("DD.MM.YYYY");
      },
      set: function (v) {
        return moment(v, "DD.MM.YYYY").format("DD.MM.YYYY");
      },
      required: true,
      validate: {
        validator: function (value) {
          return moment(value, "DD.MM.YYYY", true).isValid();
        },
        message: "Invalid date (must be dd.mm.yyyy).",
      },
    },
    breed: {
      type: String,
      minLength: 2,
      maxLength: 16,
      required: true,
    },
    comments: {
      type: String,
      minLength: 8,
      maxLength: 120,
      default: null,
    },
    petsURL: {
      type: String,
      default: null,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: false,
  }
);

petSchema.post("save", (error, data, next) => {
  error.status = 400;
  next();
});

const Pets = model("pet", petSchema);

module.exports = {
  Pets,
};
