const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const {
	CRAWLER_PARSE_ATTRIBUTES,
} = require("../../enum");

module.exports = function (type, rule, data) {
	switch (type) {
	case CRAWLER_PARSE_ATTRIBUTES.TEXT: { // TODO: mv to function
		const dom = new JSDOM(data);
		const element = dom.window.document.querySelector(rule);

		if (element && element.textContent) {
			const result = element.textContent;

			return result;
		}

		return false;
	}
	// TODO: more type
	default:
		throw new Error("not support type: " + type);
	}
};
