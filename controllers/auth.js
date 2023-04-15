const {
  createUser,
  loginUser,
  updateSubscription,
  getCurrentUser,
  changeAvatar,
  logoutUser,
} = require("../models/user/operations.js");

const registr = async ({ body }) => await createUser(body);
const login = async ({ body }) => await loginUser(body);
const subscription = async (req) => await updateSubscription(req);
const avatar = async (req) => await changeAvatar(req);
const current = async (user) => await getCurrentUser(user);
const logout = async (user) => await logoutUser(user);

module.exports = { registr, login, current, avatar, logout, subscription };