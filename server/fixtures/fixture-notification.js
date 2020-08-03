const model = require("../models/notification");
const Notification = require("../stores/notification");
const fixturedUsers = require("./data/notification");
const logger = require("../lib/logger");

async function createDocuments () {
	for (let i = 0; i < fixturedUsers.length; i++) {
		await Notification.create(fixturedUsers[i]);
	}
}
async function init() {
	try {
		await createDocuments();
		logger.info("[mysql][notifications] fixture done");
	} catch (error) {
		logger.info("[mysql][notifications] fixture failed" + error.stack);
	}
}

async function drop() {
	await model.sync({ force: true });
}

module.exports = {
	init,
	drop,
};
