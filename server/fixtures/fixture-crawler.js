const model = require("../models/crawler");
const Crawler = require("../stores/crawler");
const fixtures = require("./data/crawler");
const logger = require("../lib/logger");

async function createDocuments () {
	for (let i = 0; i < fixtures.length; i++) {
		await Crawler.create(fixtures[i]);
	}
}
async function init() {
	try {
		await createDocuments();
		logger.info("[mysql][crawler] fixture done");
	} catch (error) {
		logger.info("[mysql][crawler] fixture failed" + error.stack);
	}
}

async function drop() {
	await model.sync({ force: true });
}

module.exports = {
	init,
	drop,
};
