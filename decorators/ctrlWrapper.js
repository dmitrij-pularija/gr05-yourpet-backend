const ctrlWrapper = (ctrl) => {
  const func = async (req, res, next) => {
    try {
      const result = await ctrl(req, res, next);
      if (!result) return res.status(404).json({ message: "Not Found" });
      if (result.length === 0 && ctrl.name === "list")
        return res.status(404).json({ message: "Not Found" });
      if (res.headersSent) return;
      if (ctrl.name === "del") {
        return res
          .status(200)
          .json({ message: `Contact with id:${req.params.contactId} deleted` });
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