const Contacts = require("../models/contacts/schemas");
const HttpError = require("./httpError");

const FindDuplicates = async (body, owner, id = "") => {
  const fields = Object.keys(body);
  const duplicates = await Promise.all(
    fields.map(async (field) => {
      const filter = { owner, [field]: body[field] };
      if (id) filter._id = { $ne: id };
      const isDuplicate = await Contacts.find(filter);
      if (isDuplicate.length > 0) return field;
      else return null;
    })
  );
  const duplicateFields = duplicates.filter((field) => field !== null);
  if (duplicateFields.length > 0)
    throw HttpError(
      400,
      `Pet with fields: ${duplicateFields.join(", ")} already exists`
    );
};

module.exports = FindDuplicates;