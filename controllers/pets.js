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

const add = async (req, res) => {
  const { _id: owner } = req.user;
  const { name } = req.body;
  const result = await Pets.findOne({ name });
  if (result) {
    return res.status(409).json({ message: "Pet already exists" });
  }
  const newPet = await Pets.create({ ...req.body, owner });
  res.status(201).json(newPet);
};

const del = async (req, res) => {
  const { id } = req.params;
  const result = await Pets.findByIdAndRemove(id);
  if (!result) {
    return res.status(404).json({ message: "Not found" });
  }
  res.status(200).json({ message: "Pet deleted" });
};

const delImage = async (req, res) => {
  try {
    const { id } = req.params;
    const owner = req.user._id;
    const pet = await Pets.findOne({ owner: owner, _id: id });
    console.log(pet);

    if (!pet) {
      return res.status(404).json({ message: "Pet not found" });
    }
    pet.petsURL = "";
    await pet.save();

    return res.status(200).json({ message: "Photo deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

const addImagePets = async ({
  file: { path: cloudinaryURL },
  user: { _id },
  res,
}) => {
  try {
    const ownerId = _id;
    const pet = await Pets.findOne({ owner: ownerId });

    if (!pet) {
      return res.status(404).json({ message: "No pet found" });
    }

    if (!cloudinaryURL) {
      return res.status(400).json({ message: "Empty body" });
    }

    pet.petsURL = cloudinaryURL;
    const updatedPet = await pet.save();

    if (updatedPet) {
      return res.status(201).json({ message: "Successfully added" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { listPets, add, del, delImage, addImagePets };
