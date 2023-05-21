const NewsModel = require("./schemas");

const getNews = async (req, res) => {
  try {
    const { page, perpage, search } = req.query;
    const pageNumber = parseInt(page) || 1;
    const limit = parseInt(perpage) || 20;
    const skip = (pageNumber - 1) * limit;

    const query = {
      title: { $regex: new RegExp(search, "i") },
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

    res.json({
      page: pageNumber,
      total: totalNewsCount,
      data,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getNews,
};
