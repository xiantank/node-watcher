const axios = require("axios");

module.exports = {
	send:  function (message, { token, options: { chat_id } = {} } = {}) {
		const telegramUrl = `https://api.telegram.org/bot${token}/sendMessage`;
		return axios.post(telegramUrl, {
			chat_id,
			text: message,
		});
	},
};
