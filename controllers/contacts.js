const {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
} = require("../models/contacts.js");

const list = async (_, res, next) => {
  try {
    const contacts = await listContacts();
    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
};

const get = async ({ params: { contactId } }, res, next) => {
  try {
    const contact = await getContactById(contactId);

    if (!contact)
      return res
        .status(404)
        .json({ message: `Contact with id:${contactId} not found` });

    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
};

const add = async ({ body }, res, next) => {
  try {
    const contacts = await listContacts();
    const duplicates = ["name", "email", "phone"].reduce((acc, field) => {
      const isDuplicate = contacts.find(
        (contact) => contact[field] === body[field]
      );
      if (isDuplicate) acc.push(field);
      return acc;
    }, []);

    if (duplicates.length > 0)
      return res.status(400).json({
        message: `Contact with fields: ${duplicates.join(", ")} already exists`,
      });

    const contact = await addContact(body);

    res.status(201).json(contact);
  } catch (error) {
    next(error);
  }
};

const del = async ({ params: { contactId } }, res, next) => {
  try {
    const removedContact = await removeContact(contactId);
    if (!removedContact)
      return res
        .status(404)
        .json({ message: `Contact with id:${contactId} not found` });
    res.status(200).json({ message: `Contact  with id:${contactId} deleted` });
  } catch (error) {
    next(error);
  }
};

const edit = async ({ params: { contactId }, body }, res, next) => {
  try {
    const contacts = await listContacts();
    const duplicates = ["name", "email", "phone"].reduce((acc, field) => {
      const isDuplicate = contacts.find(
        (contact) => contact[field] === body[field] && contact.id !== contactId
      );
      if (isDuplicate) acc.push(field);
      return acc;
    }, []);

    if (duplicates.length > 0)
      return res.status(400).json({
        message: `Contact with fields: ${duplicates.join(", ")} already exists`,
      });

    const updatedContact = await updateContact(contactId, body);
    if (!updatedContact)
      return res
        .status(404)
        .json({ message: `Contact with id:${contactId} not found` });

    res.status(200).json(updatedContact);
  } catch (error) {
    next(error);
  }
};

module.exports = { list, get, add, del, edit };