const {
	addNotice,
	getFavoriteByOwner,
	addNoticeToFavorite,
	deleteNoticeFromFavorite,
	getOneNotice,
	deleteNotice,
	getNoticeCategory,
	// getNoticeByTitle,
	getNoticeByOwnerId,
} = require("../models/notices/operations");

const add = async (req) => await addNotice(req);
const getFavorite = async ({ query: { search, age, gender, page, perpage }, user: { _id } }) => await getFavoriteByOwner({_id , search , age , gender, page, perpage});
const addFavorite = async ({params: { id }, user: { _id } }) => await addNoticeToFavorite(id, _id);
const delFavourite = async ({params: { id }, user: { _id } }) =>
	await deleteNoticeFromFavorite(id, _id);
const getOne = async ({ id }) => await getOneNotice(id);
const getCategory = async (req) => await getNoticeCategory(req);
// const getByTitle = async (req) => await getNoticeByTitle(req);
const getByOwnerId = async ({ query: { search, age, gender, page, perpage }, user: { _id } }) =>
	await getNoticeByOwnerId({_id , search , age , gender, page, perpage});
const del = async ({ params: { id }, user }) => await deleteNotice(id, user);

module.exports = {
	add,
	getFavorite,
	getCategory,
	getOne,
	// getByTitle,
	getByOwnerId,
	addFavorite,
	delFavourite,
	del,
};
