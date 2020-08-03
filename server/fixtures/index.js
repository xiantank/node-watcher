const {
	connect,
} = require("../lib/db");

module.exports = async function () {
	try {
		const db = await connect(process.env.MYSQL_URL);

		const User = require("./fixture-user");
		const Notification = require("./fixture-notification");
		const Crawler = require("./fixture-crawler");

		await db.query("SET FOREIGN_KEY_CHECKS = 0", null, { raw: true });
		await User.drop();
		await Crawler.drop();
		await Notification.drop();
		await db.query("SET FOREIGN_KEY_CHECKS = 1", null, { raw: true });

		await User.init();
		await Notification.init();
		await Crawler.init();


	} catch (error) {
		console.log(error);
	}
};
