const { isValidObjectId } = require("mongoose");
const HttpError = require("../utilities/httpError");
const FindDuplicates = require("../utilities/duplicate");

const ctrlWrapper = (ctrl) => {
  const func = async (req, res, next) => {
    const { name } = ctrl;
    const {
      body,
      user: { _id },
      params: { contactId },
    } = req;
    try {
      if (name !== "add" && name !== "list" && !isValidObjectId(contactId))
        throw HttpError(404);
      if (name === "add") await FindDuplicates(body, _id);
      if (name === "edit") await FindDuplicates(body, _id, contactId);

      const result = await ctrl(req, res, next);

      if (!result) throw HttpError(404);
      if (result.length === 0 && name === "list") throw HttpError(404);
      if (res.headersSent) return;
      if (name === "del") {
        return res
          .status(200)
          .json({ message: `Contact with id:${contactId} deleted` });
      } else {
        return res.status(200).json(result);
      }
    } catch (error) {
      next(error);
    }
  };
  return func;
};

module.exports = ctrlWrapper;