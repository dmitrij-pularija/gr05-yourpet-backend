const { Pets } = require("./schemas");
const httpError = require("../../utilities/httpError");

const listPets = async ({
  query: { favorite, page, limit },
  user: { _id },
}) => {
  const filter = { owner: _id };
  const pageNumber = parseInt(page) || 1;
  const perPage = parseInt(limit) || 20;
  const skip = (pageNumber - 1) * perPage;

  if (favorite) filter.favorite = favorite;

  return await Pets.find(filter).skip(skip).limit(perPage);
};
const removePet = async (req, res) => {
  const { _id } = req.params;
  const result = await Pets.findByIdAndRemove(_id);
  if (!result) {
    throw httpError(404, "There is no such id");
  }
  res.json({ message: "Pet deleted" });
};

const addPet = async ({ req, body, res }) => {
  const { _id: owner } = req.user;
  const newPet = await Pets.create({ ...body, owner });
  return res.status(201).json(newPet);
};
module.exports = {
  listPets,
  removePet,
  addPet,
};
