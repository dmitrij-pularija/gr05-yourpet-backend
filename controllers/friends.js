const { listFriends } = require("../models/friends/operations");

const getAll = async (req) => await listFriends(req);

module.exports = { getAll };
