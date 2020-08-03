const { CRAWLER_INTERVAL_TYPE } = require("../enum");
const Crawler = require("../stores/crawler");
var moment = require("moment-timezone");

function calculateIntervalTypesByDate(d) {
	const m = moment(d).tz("Asia/Taipei");
	const minute = m.get("minutes");
	const hour = m.get("hours");
	const day = m.get("day");
	const date = m.get("date");

	const intervalTypes = [CRAWLER_INTERVAL_TYPE.MINUTELY];


	if (!(minute % 5)) {
		intervalTypes.push(CRAWLER_INTERVAL_TYPE.EVERY_5_MINUTES);
	}
	if (!(minute % 15)) {
		intervalTypes.push(CRAWLER_INTERVAL_TYPE.EVERY_15);
	}
	if (!(minute % 30)) {
		intervalTypes.push(CRAWLER_INTERVAL_TYPE.EVERY_30_MINUTES);
	}
	if (minute === 0) {
		intervalTypes.push(CRAWLER_INTERVAL_TYPE.HOURLY);
	}
	if (hour === 0) {
		intervalTypes.push(CRAWLER_INTERVAL_TYPE.DAILY);
	}
	if (day === 0) {
		intervalTypes.push(CRAWLER_INTERVAL_TYPE.WEEKLY);
	}
	if (date === 1) {
		intervalTypes.push(CRAWLER_INTERVAL_TYPE.MONTHLY);
	}

	return intervalTypes;
}

module.exports = async function() {
	const date = new Date();
	const tid = moment(date).tz("Asia/Taipei").format("YYYYMMDDhhmm");
	const intervalTypes = calculateIntervalTypesByDate(date);

	const crawlers = await Crawler.getWithinIntervalTypes(intervalTypes);

	return crawlers.map((crawler) => {
		crawler = crawler.dataValues;
		delete crawler.interval_type;
		crawler.id = `${tid}-${crawler.id}`;

		return { data: crawler };
	});
};
