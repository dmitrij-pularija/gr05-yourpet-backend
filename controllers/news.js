const { listNews, getNewsByTitle } = require("../models/news/operations");

const getAll = async (req) => await listNews(req);
const getByTitle = async (req) => await getNewsByTitle(req);

module.exports = { getAll, getByTitle };
