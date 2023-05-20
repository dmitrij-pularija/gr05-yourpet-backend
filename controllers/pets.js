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
  const duplicate = await Pets.findOne({ name });
  if (duplicate) {
    return res.status(409).json({ message: "Pet already exists" });
  }
  if (!req.body) {
    return res.status(400).json({ message: `The fild is empty` });
  }
  if (!req.file) {
    return res.status(400).json({ message: `The file is not loaded` });
  }
  const result = await Pets.create({
    ...req.body,
    petsURL: req.file.path,
    owner,
  });
  res.status(201).json({
    result,
  });
};

const delImage = async (req, res) => {
  try {
    const { id } = req.params;
    const owner = req.user._id;
    const pet = await Pets.findOne({ owner: owner, _id: id });
    if (!pet) {
      return res.status(404).json({ message: "Pet not found" });
    }

    pet.petsURL = null;
    await pet.save();
    return res.status(200).json({ message: "Photo deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { listPets, del, delImage, addImageAndPet };
