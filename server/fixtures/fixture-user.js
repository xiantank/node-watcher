const model = require("../models/user");
const User = require("../stores/user");
const fixturedUsers = require("./data/user");
const logger = require("../lib/logger");

async function createUsersDocuments () {
	for (let i = 0; i < fixturedUsers.length; i++) {
		await User.create(fixturedUsers[i]);
	}
}

async function init() {
	try {
		await createUsersDocuments();
		logger.info("[mysql][users] fixture done");
	} catch (error) {
		logger.info("[mysql][users] fixture failed" + error.stack);
	}
}

async function drop() {
	await model.sync({ force: true });
}

module.exports = {
	init,
	drop,
};
