const axios = require("axios");
const mq = require("../lib/mq/bull");
const crawlerHelper = require("../lib/crawler-helper");
const logger = require("../lib/logger");
const topic = "crawler";
const notificationTopic = "notification";

async function start() {
	mq.subscribe(topic, async function (job) {
		logger.info(`message received on ${topic}: ${JSON.stringify(job)}`);
		const {
			name, url,
			parse_attributes, parser,
			compare_type, target,
			user_id,
		} = job.data;

		const response = await axios.get(url);

		const result = crawlerHelper.parse(parse_attributes, parser, response.data);
		const isMatched = crawlerHelper.compare(compare_type, target, result);

		if (isMatched) {
			const output = {
				name,
				user_id,
				result,
			};

			mq.publish(notificationTopic, output);
		}

		return { name, isMatched };
	});

	mq.getMQ(topic).on("completed", function(job, result) {
		logger.info("worker.js:completed:" + JSON.stringify(result));
	});

	mq.getMQ(topic).on("error", function(error) {
		logger.error(`[mq][${topic}]`, error);
	});

}

module.exports = {
	start,
};
