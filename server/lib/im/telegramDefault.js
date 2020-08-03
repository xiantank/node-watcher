const axios = require("axios");

module.exports = {
	send:  function (message, { token } = {}) {
		const telegramUrl = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`;
		return axios.post(telegramUrl, {
			chat_id: token,
			text: message,
		});
	},
};
