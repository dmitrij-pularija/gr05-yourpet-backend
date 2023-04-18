const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const { v4: uuidv4 } = require("uuid");
const Jimp = require("jimp");
const path = require("path");
const { unlink } = require("fs/promises");

const { SECRET_KEY } = process.env;
const User = require("./schemas");
const HttpError = require("../../utilities/httpError");
const sendEmail = require("../../utilities/sendEmail");
const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const createUser = async (body) => {
  const user = await User.findOne({ email: body.email });
  if (user) throw HttpError(409, "Email in use");
  const avatarURL = gravatar.url(body.email, { protocol: "http", s: "250" });
  const password = await bcrypt.hash(body.password, 10);
  const verificationToken = uuidv4();
  const { name, email, subscription } = await User.create({
    ...body,
    password,
    avatarURL,
    verificationToken,
  });

  await sendEmail(verificationToken, email, name);

  return { user: { name, email, subscription, avatarURL } };
};

const verifyEmail = async (verificationToken) => {
  const user = await User.findOne({ verificationToken });
  if (!user) throw HttpError(404, "User not found");
  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: null,
  });

  return { message: "Verification successful" };
};

const resendVerifyEmail = async (email) => {
  const user = await User.findOne({ email });
  if (!user) throw HttpError(404, "User not found");
  if (user.verify) throw HttpError(400, "Verification has already been passed");

  await sendEmail(user.verificationToken, email, user.name);

  return { message: "Verification email sent" };
};

const loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) throw HttpError(401, "Email or password is wrong");
  if (!user.verify) throw HttpError(401, "Email not verified");
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) throw HttpError(401, "Email or password is wrong");
  const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: "23h" });
  const { name, subscription, avatarURL } = await User.findByIdAndUpdate(
    user._id,
    {
      token,
    }
  );
  return { token, user: { name, email, subscription, avatarURL } };
};

const logoutUser = async (_id) =>
  await User.findByIdAndUpdate(_id, { token: null });

const getCurrentUser = async (name, email, subscription, avatarURL) => {
  return await { user: { name, email, subscription, avatarURL } };
};

const updateSubscription = async (subscription, _id) => {
  const { name, email, avatarURL } = await User.findByIdAndUpdate(_id, {
    subscription,
  });
  return { user: { name, email, subscription, avatarURL } };
};

const changeAvatar = async (tempUpload, _id) => {
  const filename = `${_id}_avatar.jpg`;
  const resultUpload = path.join(avatarsDir, filename);
  const image = await Jimp.read(tempUpload);
  image.resize(250, 250);
  const whiteImage = await new Jimp(250, 250, 0xffffffff);
  whiteImage.composite(image, 0, 0);
  await whiteImage.quality(65).write(resultUpload);
  const avatarURL = path.join("avatars", filename);
  await User.findByIdAndUpdate(_id, { avatarURL });
  await unlink(tempUpload);
  return { avatarURL };
};

module.exports = {
  createUser,
  verifyEmail,
  resendVerifyEmail,
  loginUser,
  logoutUser,
  changeAvatar,
  getCurrentUser,
  updateSubscription,
};