const {
	createUser,
	loginUser,
	logoutUser,
} = require("../models/user/operations.js");

const registr = async ({ body }) => await createUser(body);

const login = async ({ body: { email, password } }) =>
	await loginUser(email, password);

const logout = async ({ user: { _id } }) => await logoutUser(_id);

module.exports = {
	registr,
	login,
	logout,
};
