// const { isValidObjectId } = require("mongoose");
const HttpError = require("../utilities/httpError");
// const FindDuplicates = require("../utilities/duplicate");

const ctrlWrapper = (ctrl) => {
  const func = async (req, res, next) => {
    const { name } = ctrl;
    const {
      params: { id },
    } = req;
    try {
    //   if (name !== "add" && name !== "list" && !isValidObjectId(id))
    //     throw HttpError(404);
      // if (name === "add") await FindDuplicates(body, _id);
      // if (name === "edit") await FindDuplicates(body, _id, id);
      
      const result = await ctrl(req, res, next);
      
      if (name === "addFavorite" && result ) return res.status(200).json({ message: `Notice with id:${id} successfully added to favorites` });
      if (name === "delFavourite" && result ) return res.status(200).json({ message: `Notice with id:${id} deleted from favorite` });
      if (!result) throw HttpError(404);
      // if (result.length === 0) throw HttpError(404);
      // if (res.headersSent) return;
      // if (name === "delFavourite") {
      //   return res.status(200).json({ message: `Pet with id:${id} deleted` });
      // } else {
        return res.status(200).json(result);
      // }
    } catch (error) {
      next(error);
    }
  };
  return func;
};

module.exports = ctrlWrapper;
