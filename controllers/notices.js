const {
	createNotice,
	getFavoriteByOwner,
	addNoticeToFavorite,
	deleteNoticeFromFavorite,
	getNoticeInfById,
	deleteNotice,
	getNoticeByCategory,
	// getNoticeByTitle,
	getNoticeByOwnerId,
} = require("../models/notices/operations");

const selecQuery = async (req) => {
    const {	params: { category }, query: { search, age, gender, page, perpage } } = req;
	// if (req.user) {
		// const {	user: { _id } } = req;	
    // if (req.user) {const {	user: { _id } } = req; } 
	if (category === 'favorite') return await getFavoriteByOwner({ _id: req.user._id, category, search , age , gender, page, perpage });
	if (category === 'own') return await getNoticeByOwnerId({_id: req.user._id, category, search , age , gender, page, perpage});
// }
    return await getNoticeByCategory({ category, search , age , gender, page, perpage });
}


const addNotice = async (req) => await createNotice(req);
// const getFavorite = async ({ query: { search, age, gender, page, perpage }, user: { _id } }) => await getFavoriteByOwner({_id , search , age , gender, page, perpage});
const addFavorite = async ({params: { id }, user: { _id } }) => await addNoticeToFavorite(id, _id);
const delFavorite = async ({params: { id }, user: { _id } }) =>
	await deleteNoticeFromFavorite(id, _id);
const getNoticeById = async ({ params: { id } }) => await getNoticeInfById(id);
// const getCategory = async (req) => await getNoticeCategory(req);
// // const getByTitle = async (req) => await getNoticeByTitle(req);
// const getByOwnerId = async ({ query: { search, age, gender, page, perpage }, user: { _id } }) =>
	// await getNoticeByOwnerId({_id , search , age , gender, page, perpage});
const delNotice = async ({ params: { id }, user }) => await deleteNotice(id, user);

module.exports = {
	addNotice,
	// getFavorite,
	// getCategory,
	getNoticeById,
	// // getByTitle,
	// getByOwnerId,
	addFavorite,
	delFavorite,
	delNotice,
	selecQuery,
};
