const NoticeModel = require("./schemas");

const addNotice = async ({ body, user: { _id } }) =>
  await NoticeModel.create({ ...body, owner: _id });
const addNoticeToFavorite = async ({ id, user: { _id } }) =>
  await NoticeModel.findByIdAndUpdate(id, { favorite: _id });
const deleteNoticeFromFavorite = async (id) =>
  await NoticeModel.findByIdAndDelete(id);
const getOneNotice = async ({ id }) => await NoticeModel.findById(id);
const getNoticeCategory = async ({ query: { category, search } }) => {
  const conditions = {
    category: decodeURIComponent(category),
  };

  if (search) {
    conditions.$or = [
      { title: { $regex: new RegExp(decodeURIComponent(search), "i") } },
      { name: { $regex: new RegExp(decodeURIComponent(search), "i") } },
      { breed: { $regex: new RegExp(decodeURIComponent(search), "i") } },
      { comments: { $regex: new RegExp(decodeURIComponent(search), "i") } },
    ];
  }
  return await NoticeModel.find(conditions);  
};
// const getNoticeCategory = async ({ query: { category } }) =>
//   await NoticeModel.find({ category: decodeURIComponent(category) });
const getNoticeByOwnerId = async (id, user) =>
  await NoticeModel.find({ owner: user._id, _id: id });
const deleteNotice = async (id, user) =>
  await NoticeModel.findOneAndRemove({ owner: user._id, _id: id });

module.exports = {
  addNotice,
  addNoticeToFavorite,
  deleteNoticeFromFavorite,
  getNoticeCategory,
  // getNoticeByTitle,
  getNoticeByOwnerId,
  getOneNotice,
  deleteNotice,
};