const express = require("express");
const router = express.Router();

const ctrlWrapper = require("../../decorators/ctrlWrapper");
const { getAll } = require("../../controllers/friends");

router.get("/", ctrlWrapper(getAll));

module.exports = router;
