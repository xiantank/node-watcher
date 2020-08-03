const {
	CRAWLER_INTERVAL_TYPE,
	CRAWLER_PARSE_ATTRIBUTES,
	CRAWLER_COMPARE_TYPE,
} = require("../../enum");

module.exports = [
	{
		name: "hackernews.title:1",
		interval_type: CRAWLER_INTERVAL_TYPE.MINUTELY,
		url: "https://news.ycombinator.com/",
		parse_attributes: CRAWLER_PARSE_ATTRIBUTES.TEXT,
		parser: "table.itemlist > tbody > tr:nth-child(1).athing > td:nth-child(3).title > a:nth-child(1).storylink",
		compare_type: CRAWLER_COMPARE_TYPE.EXIST,
		target: undefined,
		user_id: 1,
	},
];
