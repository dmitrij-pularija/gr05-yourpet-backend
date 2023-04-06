const {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
  updateStatusContact,
} = require("../models/contacts.js");

const list = async () => await listContacts();
const get = async ({ params: { contactId } }) =>
  await getContactById(contactId);
const add = async ({ body }) => await addContact(body);
const del = async ({ params: { contactId } }) => await removeContact(contactId);
const edit = async ({ params: { contactId }, body }) =>
  await updateContact(contactId, body);
const fav = async ({ params: { contactId }, body }) =>
  await updateStatusContact(contactId, body);

module.exports = { list, get, add, del, edit, fav };