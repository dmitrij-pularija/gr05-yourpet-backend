const NewsModel = require("./schemas");

const getNews = async (req, res) => {
  try {
    const { page, perPage, title } = req.query;
    const pageNumber = parseInt(page) || 1;
    const limit = parseInt(perPage) || 20;
    const skip = (pageNumber - 1) * limit;

    const query = {
      title: { $regex: new RegExp(title, "i") },
    };

    const newsQuery = NewsModel.find(query)
      .sort({ date: -1 })
      .skip(skip)
      .limit(limit);

    const newsCountQuery = NewsModel.countDocuments(query);

    const [data, totalNewsCount] = await Promise.all([
      newsQuery,
      newsCountQuery,
    ]);

    const totalPages = Math.ceil(totalNewsCount / limit);

    res.json({
      totalPages,
      totalNewsCount,
      data,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getNews,
};
