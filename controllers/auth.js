const {
  createUser,
  verifyEmail,
  resendVerifyEmail,
  loginUser,
  updateSubscription,
  getCurrentUser,
  changeAvatar,
  logoutUser,
} = require("../models/user/operations.js");

const registr = async ({ body }) => await createUser(body);

const verify = async ({ params: { verificationToken } }) =>
  await verifyEmail(verificationToken);

const resendVerify = async ({ body: { email } }) =>
  await resendVerifyEmail(email);

const login = async ({ body: { email, password } }) =>
  await loginUser(email, password);

const subscription = async ({ body: { subscription }, user: { _id } }) =>
  await updateSubscription(subscription, _id);

const avatar = async ({ file: { path: tempUpload }, user: { _id } }) =>
  await changeAvatar(tempUpload, _id);

const current = async ({ user: { name, email, subscription, avatarURL } }) =>
  await getCurrentUser(name, email, subscription, avatarURL);
  
const logout = async ({ user: { _id } }) => await logoutUser(_id);

module.exports = {
  registr,
  verify,
  resendVerify,
  login,
  current,
  avatar,
  logout,
  subscription,
};