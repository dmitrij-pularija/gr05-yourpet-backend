const express = require("express");
const router = express.Router();

const ctrlWrapper = require("../../decorators/ctrlWrapper");

const { getAllNews } = require("../../controllers/news");

router.get("/", ctrlWrapper(getAllNews));

module.exports = router;
