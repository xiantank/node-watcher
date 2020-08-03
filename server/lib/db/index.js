const Sequelize = require("sequelize");
const logger = require("../logger");
let db;

async function connect(...args) {
	db = new Sequelize(...args);

	await db.authenticate();
	logger.info("[db] connected");

	return db;
}

function getDB() {
	if (db) {
		return db;
	} else {
		throw new Error("[db] unconnected");
	}
}
module.exports = {
	connect,
	getDB,
};
