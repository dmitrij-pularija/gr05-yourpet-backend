const {
	updateUser,
	changeAvatar,
	getCurrentUser,
} = require("../models/user/operations.js");

const current = async ({
	user: { _id, name, email, birthday, phone, city, avatarURL },
}) => await getCurrentUser(_id, name, email, birthday, phone, city, avatarURL);
const update = async ({ body, user: { _id } }) => await updateUser(body, _id);
const avatar = async ({ file: { path: cloudinaryURL }, user: { _id } }) => {
	return await changeAvatar(cloudinaryURL, _id);
};

module.exports = {
	current,
	avatar,
	update,
};
