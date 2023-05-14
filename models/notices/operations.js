const NoticeModel = require("./schemas");

const addNotice = async ({ body, user: { _id } }) =>
	await NoticeModel.create({ ...body, owner: _id });

const getOneNotice = async ({ id }) => await NoticeModel.findById(id);
const getNoticeByTitle = async ({ title, category }) =>
	await NoticeModel.find({ title, category });
const getNoticeCategory = async ({ category }) =>
	await NoticeModel.find({ category });
const getNoticeByOwnerId = async (id, user) =>
	await NoticeModel.find({ owner: user._id, _id: id });
const deleteNotice = async (id, user) =>
	await NoticeModel.findOneAndRemove({ owner: user._id, _id: id });

module.exports = {
	addNotice,
	getNoticeCategory,
	getNoticeByTitle,
	getNoticeByOwnerId,
	getOneNotice,
	deleteNotice,
};
