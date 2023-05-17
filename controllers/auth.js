const {
	createUser,
	// verifyEmail,
	// resendVerifyEmail,
	loginUser,
	updateUser,
	getCurrentUser,
	changeAvatar,
	logoutUser,
} = require("../models/user/operations.js");

const registr = async ({ body }) => await createUser(body);

// const verify = async ({ params: { verificationToken } }) =>
// 	await verifyEmail(verificationToken);

// const resendVerify = async ({ body: { email } }) =>
// 	await resendVerifyEmail(email);

const login = async ({ body: { email, password } }) =>
	await loginUser(email, password);

const update = async ({ body, user: { _id } }) => await updateUser(body, _id);

// const avatar = async ({ file: { path: tempUpload }, user: { _id } }) => {
// 	console.log(tempUpload);
// 	await changeAvatar(tempUpload, _id);
// };

const avatar = async ({ file: { path: cloudinaryURL }, user: { _id } }) => {
	return await changeAvatar(cloudinaryURL, _id);
};

const current = async ({
	user: { _id, name, email, birthday, phone, city, avatarURL },
}) => await getCurrentUser(_id, name, email, birthday, phone, city, avatarURL);

const logout = async ({ user: { _id } }) => await logoutUser(_id);

module.exports = {
	registr,
	// verify,
	// resendVerify,
	login,
	current,
	avatar,
	logout,
	update,
};
