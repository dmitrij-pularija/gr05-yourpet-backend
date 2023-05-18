const {
	addNotice,
	addNoticeToFavorite,
	deleteNoticeFromFavorite,
	getOneNotice,
	deleteNotice,
	getNoticeCategory,
	// getNoticeByTitle,
	getNoticeByOwnerId,
} = require("../models/notices/operations");

const add = async (req) => await addNotice(req);
const addFavorite = async (req) => await addNoticeToFavorite(req);
const delFavourite = async ({ params: { id } }) =>
	await deleteNoticeFromFavorite(id);
const getOne = async ({ id }) => await getOneNotice(id);
const getCategory = async (req) => await getNoticeCategory(req);
// const getByTitle = async (req) => await getNoticeByTitle(req);
const getByOwnerId = async ({ params: { id }, user }) =>
	await getNoticeByOwnerId(id, user);
const del = async ({ params: { id }, user }) => await deleteNotice(id, user);

module.exports = {
	add,
	getCategory,
	getOne,
	// getByTitle,
	getByOwnerId,
	addFavorite,
	delFavourite,
	del,
};
