const { Pets } = require("../models/pets/schemas");

const listPets = async (req, res) => {
  const { id } = req.user;
  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;

  const UserPets = await Pets.find({ owner: id })
    .skip(skip)
    .limit(parseInt(limit));
  res.status(200).json(UserPets);
};

const del = async (req, res) => {
  const { id } = req.params;
  const result = await Pets.findByIdAndRemove(id);
  if (!result) {
    return res.status(404).json({ message: "Not found" });
  }
  res.status(200).json({ message: "Pet deleted" });
};

const addImageAndPet = async (req, res) => {
  const { _id: owner } = req.user;
  const { name } = req.body;

  const duplicate = await Pets.findOne({ name, owner });
  if (duplicate) {
    return res.status(409).json({ message: "Pet already exists" });
  }

  if (!req.body) {
    return res.status(400).json({ message: "The field is empty" });
  }
  if (!req.file) {
    return res.status(400).json({ message: "The file is not loaded" });
  }

  const result = await Pets.create({
    ...req.body,
    petsURL: req.file.path,
    owner,
  });

  res.status(201).json({ result });
};

module.exports = { listPets, del, addImageAndPet };
