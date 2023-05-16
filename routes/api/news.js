const express = require("express");
const router = express.Router();

const ctrlWrapper = require("../../decorators/ctrlWrapper");

const { getAll, getByTitle } = require("../../controllers/news");

router.get("/", ctrlWrapper(getAll));
router.get("/title", ctrlWrapper(getByTitle));

module.exports = router;
