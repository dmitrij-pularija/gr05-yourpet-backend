const {
  listNews,
  getNewsByTitle,
  sortNews,
  searchNews,
} = require("../models/news/operations");

const getAll = async (req) => await listNews(req);
const getByTitle = async (req) => await getNewsByTitle(req);

const sortAllNews = async (req) => await sortNews(req);

const searchNewsByTitle = async (req, res) => await searchNews(req, res);

module.exports = { getAll, getByTitle, sortAllNews, searchNewsByTitle };
