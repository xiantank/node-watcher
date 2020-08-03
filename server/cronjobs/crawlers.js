const { CronJob } = require("cron");
const fetchCrawlerJobs = require("../events/fetch-crawler-jobs");
const mq = require("../lib/mq");
const topic = "crawler";

function start() {
	const cron = new CronJob("* * * * *", async () => {
		const jobs = await fetchCrawlerJobs();

		mq.publish(topic, jobs);
	});

	cron.start();
}

module.exports = {
	start,
};
