const privateWrapper = (ctrl) => {
  const func = async (req, res, next) => {
    const {
      params: { category },
    } = req;

    try {
      if (category === "own" || category === "favorite") {
        return await ctrl(req, res, next);
      } else {
        next();
      }
    } catch (error) {
      next(error);
    }
  };
  return func;
};

module.exports = privateWrapper;