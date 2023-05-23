const NoticeModel = require("./schemas");
const HttpError = require("../../utilities/httpError");
const filterNotices = require("../../utilities/filter");

const categories = {
  "sell": "sell",
  "lost-found": "lost/found",
  "for-free": "In good hands",
};

const getFavoriteByOwner = async ({
  _id,
  category,
  search,
  age,
  gender,
  page,
  perpage,
}) => {
  const pageNumber = parseInt(page) || 1;
  const limit = parseInt(perpage) || 20;
  const skip = (pageNumber - 1) * limit;
  const filter = filterNotices({
    _id,
    category,
    search,
    age,
    gender,
  });
  const totalCount = await NoticeModel.find(filter).count();
  const data = await NoticeModel.find(filter)
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: "descending" });
  return await { page: pageNumber, total: totalCount, data };
};

const addNoticeToFavorite = async (id, _id) => {
  const dubl = await NoticeModel.findOne({
    _id: id,
    favorite: { $in: [_id] },
  });

  if (dubl)
    throw HttpError(409, `Notice with id:${id} is already in favorites`);
  return await NoticeModel.findOneAndUpdate(
    { _id: id },
    { $push: { favorite: _id } },
    { new: true }
  );
};

const deleteNoticeFromFavorite = async (id, _id) =>
  await NoticeModel.findOneAndUpdate(
    { _id: id, favorite: { $in: [_id] } },
    { $pull: { favorite: _id } },
    { new: true }
  );

const createNotice = async ({
  body,
  file: { path },
  user: { _id, email, phone },
}) => {
  const { name } = body;
  const dubl = await NoticeModel.findOne({ name, owner: _id });
  if (dubl)
    throw HttpError(409, `Pet with name ${name} is already in your notices`);
  return await NoticeModel.create({
    ...body,
    image: path,
    owner: _id,
    email,
    phone,
  });
};

const getNoticeInfById = async (id) => await NoticeModel.findById(id);

const getNoticeByCategory = async ({
  category,
  search,
  age,
  gender,
  page,
  perpage,
}) => {
  const pageNumber = parseInt(page) || 1;
  const limit = parseInt(perpage) || 20;
  const skip = (pageNumber - 1) * limit;
  const selectedCategory = categories[category];
  const filter = filterNotices({
    _id: "",
    category: selectedCategory,
    search,
    age,
    gender,
  });
  const totalCount = await NoticeModel.find(filter).count();
  const data = await NoticeModel.find(filter)
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: "descending" });
  return await { page: pageNumber, total: totalCount, data };
};

const getNoticeByOwnerId = async ({
  _id,
  category,
  search,
  age,
  gender,
  page,
  perpage,
}) => {
  const pageNumber = parseInt(page) || 1;
  const limit = parseInt(perpage) || 20;
  const skip = (pageNumber - 1) * limit;

  const filter = filterNotices({
    _id,
    category,
    search,
    age,
    gender,
  });
  const totalCount = await NoticeModel.find(filter).count();
  const data = await NoticeModel.find(filter)
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: "descending" });
  return await { page: pageNumber, total: totalCount, data };
};

const deleteNotice = async (id, user) =>
  await NoticeModel.findOneAndRemove({ owner: user._id, _id: id });

module.exports = {
  createNotice,
  getFavoriteByOwner,
  addNoticeToFavorite,
  deleteNoticeFromFavorite,
  getNoticeByCategory,
  getNoticeByOwnerId,
  getNoticeInfById,
  deleteNotice,
};