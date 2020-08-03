const {
	USER_TYPE,
} = require("../../enum");
module.exports = [
	{ id: 1, username: "admin", password: "password", type: USER_TYPE.ADMIN },
	{ id: 2, username: "user002", password: "user002", type: USER_TYPE.USER },
];
