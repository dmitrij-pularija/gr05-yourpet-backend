const { Schema, model } = require("mongoose");

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
      default: "00.00.0000",
      required: true,
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
    },
    image: {
      type: String,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "users",
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
