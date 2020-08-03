const {
	IM_TYPE,
} = require("../../enum");
module.exports = [
	{ id: 1, user_id: 1, im_type: IM_TYPE.TELEGRAM_DEFAULT, token: "000000000" },
	{ id: 2, user_id: 2, im_type: IM_TYPE.TELEGRAM, token: "000000000:fake-token", options: {chat_id: "000000000"} },
];
