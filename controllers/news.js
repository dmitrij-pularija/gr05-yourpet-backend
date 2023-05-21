const { getNews } = require("../models/news/operations");

const getAllNews = async (req, res) => await getNews(req, res);

module.exports = { getAllNews };
