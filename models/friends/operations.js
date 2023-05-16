const FriendModel = require("./schemas");

const listFriends = async (req, res, next) => await FriendModel.find({});

module.exports = {
	listFriends,
};
