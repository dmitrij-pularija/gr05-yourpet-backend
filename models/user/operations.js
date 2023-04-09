const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { SECRET_KEY } = process.env;
const User = require("./schemas");
const HttpError = require("../../utilities/httpError");

const createUser = async (body) => {
  const hashPassword = await bcrypt.hash(body.password, 10);
  const { name, email, subscription } = await User.create({
    ...body,
    password: hashPassword,
  });
  return { user: { name, email, subscription } };
};

const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) throw HttpError(401, "Email or password is wrong");
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) throw HttpError(401, "Email or password is wrong");
  const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: "23h" });
  const { name, subscription } = await User.findByIdAndUpdate(user._id, {
    token,
  });
  return { token, user: { name, email, subscription } };
};

const logoutUser = async ({ user: { _id } }) =>
  await User.findByIdAndUpdate(_id, { token: null });
const getCurrentUser = async ({ user: { name, email, subscription } }) =>
  await { user: { name, email, subscription } };

const updateSubscription = async ({
  body: { subscription },
  user: { _id },
}) => {
  const { name, email } = await User.findByIdAndUpdate(_id, { subscription });
  return { user: { name, email, subscription } };
};

module.exports = {
  createUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  updateSubscription,
};