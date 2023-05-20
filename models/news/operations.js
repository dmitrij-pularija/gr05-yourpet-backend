const NewsModel = require("./schemas");

const listNews = async ({ query: { page, limit } }) => {
  const pageNumber = parseInt(page) || 1;
  const perPage = parseInt(limit) || 20;
  const skip = (pageNumber - 1) * perPage;
  return NewsModel.find({}).skip(skip).limit(perPage);
};
const getNewsByTitle = async ({ query: { title, page, limit } }) => {
  const regex = new RegExp(title, "i");
  const pageNumber = parseInt(page) || 1;
  const perPage = parseInt(limit) || 20;
  const skip = (pageNumber - 1) * perPage;
  return NewsModel.find({ title: regex }).skip(skip).limit(perPage);
};

const sortNews = async ({ query: { page, limit } }) => {
  const pageNumber = parseInt(page) || 1;
  const perPage = parseInt(limit) || 20;
  const skip = (pageNumber - 1) * perPage;
  return NewsModel.find({}).sort({ date: -1 }).skip(skip).limit(perPage);
};

const searchNews = async (req, res) => {
  try {
    const { title, page, limit } = req.query;
    const pageNumber = parseInt(page) || 1;
    const perPage = parseInt(limit) || 20;
    const skip = (pageNumber - 1) * perPage;

    const query = {
      title: { $regex: new RegExp(title, "i") },
    };

    return NewsModel.find(query).sort({ date: -1 }).skip(skip).limit(perPage);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  listNews,
  getNewsByTitle,
  sortNews,
  searchNews,
};
