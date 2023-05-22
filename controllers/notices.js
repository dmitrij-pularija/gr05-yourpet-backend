const {
  createNotice,
  getFavoriteByOwner,
  addNoticeToFavorite,
  deleteNoticeFromFavorite,
  getNoticeInfById,
  deleteNotice,
  getNoticeByCategory,
  getNoticeByOwnerId,
} = require("../models/notices/operations");

const selecQuery = async (req) => {
  const {
    params: { category },
    query: { search, age, gender, page, perpage },
  } = req;
  if (category === "favorite")
    return await getFavoriteByOwner({
      _id: req.user._id,
      category,
      search,
      age,
      gender,
      page,
      perpage,
    });
  if (category === "own")
    return await getNoticeByOwnerId({
      _id: req.user._id,
      category,
      search,
      age,
      gender,
      page,
      perpage,
    });
  return await getNoticeByCategory({
    category,
    search,
    age,
    gender,
    page,
    perpage,
  });
};

const addNotice = async (req) => await createNotice(req);
const addFavorite = async ({ params: { id }, user: { _id } }) =>
  await addNoticeToFavorite(id, _id);
const delFavorite = async ({ params: { id }, user: { _id } }) =>
  await deleteNoticeFromFavorite(id, _id);
const getNoticeById = async ({ params: { id } }) => await getNoticeInfById(id);
const delNotice = async ({ params: { id }, user }) =>
  await deleteNotice(id, user);

module.exports = {
  addNotice,
  getNoticeById,
  addFavorite,
  delFavorite,
  delNotice,
  selecQuery,
};