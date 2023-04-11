const {
  createUser,
  loginUser,
  updateSubscription,
  getCurrentUser,
  logoutUser,
} = require("../models/user/operations.js");

const registr = async ({ body }) => await createUser(body);
const login = async ({ body }) => await loginUser(body);
const subscription = async (req) => await updateSubscription(req);
const current = async (user) => await getCurrentUser(user);
const logout = async (user) => await logoutUser(user);

module.exports = { registr, login, current, logout, subscription };