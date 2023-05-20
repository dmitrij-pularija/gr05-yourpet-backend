const express = require("express");
const router = express.Router();

const ctrlWrapper = require("../../decorators/ctrlWrapper");

const {
  getAll,
  getByTitle,
  sortAllNews,
  searchNewsByTitle,
} = require("../../controllers/news");

router.get("/", ctrlWrapper(getAll));
router.get("/title", ctrlWrapper(getByTitle));
router.get("/sort", ctrlWrapper(sortAllNews));
router.get("/search", ctrlWrapper(searchNewsByTitle));

module.exports = router;
