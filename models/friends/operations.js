const Contacts = require("./schemas");

const listContacts = async ({
  query: { favorite, page, limit },
  user: { _id },
}) => {
  const filter = { owner: _id };
  const pageNumber = parseInt(page) || 1;
  const perPage = parseInt(limit) || 20;
  const skip = (pageNumber - 1) * perPage;

  if (favorite) filter.favorite = favorite;

  return await Contacts.find(filter).skip(skip).limit(perPage);
};
const getContactById = async (contactId, user) =>
  await Contacts.findOne({ owner: user._id, _id: contactId });
const removeContact = async (contactId, user) =>
  await Contacts.findOneAndRemove({ owner: user._id, _id: contactId });
const addContact = async ({ body, user: { _id } }) =>
  await Contacts.create({ ...body, owner: _id });
const updateContact = async (contactId, body, user) =>
  await Contacts.findOneAndUpdate({ owner: user._id, _id: contactId }, body, {
    new: true,
  });
const updateStatusContact = async (contactId, body, user) =>
  await Contacts.findOneAndUpdate({ owner: user._id, _id: contactId }, body, {
    new: true,
  });

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};