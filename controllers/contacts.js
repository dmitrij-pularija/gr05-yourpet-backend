const {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
  updateStatusContact,
} = require("../models/contacts/operations.js");

const list = async (req) => await listContacts(req);
const get = async ({ params: { contactId }, user }) =>
  await getContactById(contactId, user);
const add = async (req) => await addContact(req);
const del = async ({ params: { contactId }, user }) =>
  await removeContact(contactId, user);
const edit = async ({ params: { contactId }, body, user }) =>
  await updateContact(contactId, body, user);
const fav = async ({ params: { contactId }, body, user }) =>
  await updateStatusContact(contactId, body, user);

module.exports = { list, get, add, del, edit, fav };