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

module.exports = {
	listNews,
	getNewsByTitle,
};
