const mq = require("../lib/mq/bull");
const { getByUserId } = require("../stores/notification");
const im = require("../lib/im");
const logger = require("../lib/logger");
const topic = "notification";

async function start() {
	mq.subscribe(topic, async function (job) {
		const {
			name,
			user_id,
			result,
		} = job.data;

		try {
			const notification = await getByUserId(user_id);

			await im.get(notification.im_type).send(result, {
				token: notification.token,
				options: notification.options,
			});
		} catch (error) {
			logger.error("[notification]", error);

			throw error;
		}

		return `${user_id}: ${name}`;
	});

	mq.getMQ(topic).on("completed", function(job, result) {
		logger.info("worker.js:completed:\n" + result);
	});
	mq.getMQ(topic).on("error", function(error) {
		logger.error(`[mq][${topic}]`, error);
	});
}

module.exports = {
	start,
};
