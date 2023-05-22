const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");

const { SECRET_KEY } = process.env;
const User = require("./schemas");
const HttpError = require("../../utilities/httpError");
const createUser = async (body) => {
  const user = await User.findOne({ email: body.email });
  if (user) throw HttpError(409, "Email in use");
  const avatarURL = gravatar.url(body.email, { protocol: "http", s: "250" });
  const password = await bcrypt.hash(body.password, 10);
  const { _id, name, email } = await User.create({
    ...body,
    password,
    avatarURL,
  });
  const token = jwt.sign({ id: _id }, SECRET_KEY, { expiresIn: "23h" });
  await User.findByIdAndUpdate(_id, { token });

  return { token, user: { _id, name, email, avatarURL } };
};

const loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) throw HttpError(401, "Email or password is wrong");
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) throw HttpError(401, "Email or password is wrong");
  const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: "23h" });
  const { _id, name, birthday, phone, city, avatarURL } =
    await User.findByIdAndUpdate(user._id, {
      token,
    });
  return {
    token,
    user: { _id, name, email, birthday, phone, city, avatarURL },
  };
};

const logoutUser = async (_id) =>
  await User.findByIdAndUpdate(_id, { token: null });

const getCurrentUser = async (
  _id,
  name,
  email,
  birthday,
  phone,
  city,
  avatarURL
) => {
  return await {
    user: { _id, name, email, birthday, phone, city, avatarURL },
  };
};

const updateUser = async (body, _id) => {
  const { name, email, city, phone, birthday, avatarURL } =
    await User.findByIdAndUpdate(_id, body, { new: true });
  return { user: { _id, name, email, city, phone, birthday, avatarURL } };
};

const changeAvatar = async (cloudinaryURL, _id) => {
  const avatarURL = cloudinaryURL;
  await User.findByIdAndUpdate(_id, { avatarURL });
  return { avatarURL };
};

module.exports = {
  createUser,
  loginUser,
  logoutUser,
  changeAvatar,
  getCurrentUser,
  updateUser,
};