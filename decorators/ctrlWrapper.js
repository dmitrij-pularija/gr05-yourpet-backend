const { isValidObjectId } = require("mongoose");
const HttpError = require("../utilities/httpError");
const checkIdNames = [
  "addFavorite",
  "delFavorite",
  "delNotice",
  "getNoticeById",
];

const ctrlWrapper = (ctrl) => {
  const func = async (req, res, next) => {
    const { name } = ctrl;
    const {
      params: { id },
    } = req;
    try {
      if (checkIdNames.includes(name) && !isValidObjectId(id))
        throw HttpError(404);

      const result = await ctrl(req, res, next);

      if (name === "addFavorite" && result)
        return res.status(200).json({
          message: `Notice with id:${id} successfully added to favorites`,
        });
      if (name === "delFavorite" && result)
        return res
          .status(200)
          .json({ message: `Notice with id:${id} deleted from favorite` });
      if (name === "delNotice" && result)
        return res
          .status(200)
          .json({ message: `Notice with id:${id} successfully deleted` });
      if (!result) throw HttpError(404);

      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };
  return func;
};

module.exports = ctrlWrapper;