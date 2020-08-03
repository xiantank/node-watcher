const logger = require("../server/lib/logger");
const mq = require("../server/lib/mq");

require("dotenv").config();

require("../server/lib/db").connect(process.env.MYSQL_URL).then(async () => {
	await mq.connect(process.env.MQ_URL);

	require("../server/workers/crawl-worker").start();
}).catch(error => {
	logger.error("[crawler-worker]", error);
});
