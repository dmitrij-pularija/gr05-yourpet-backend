const Contacts = require("../models/schemas");

const listContacts = async () => await Contacts.find();
const getContactById = async (contactId) => await Contacts.findById(contactId);
const removeContact = async (contactId) =>
  await Contacts.findByIdAndRemove(contactId);
const addContact = async (body) => await Contacts.create(body);
const updateContact = async (contactId, body) =>
  await Contacts.findByIdAndUpdate(contactId, body, { new: true });
const updateStatusContact = async (contactId, body) =>
  await Contacts.findByIdAndUpdate(contactId, body, { new: true });

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};