const {
	CRAWLER_COMPARE_TYPE,
} = require("../../enum");

module.exports = function(type, target, data) {
	switch (type) {
	case CRAWLER_COMPARE_TYPE.EXIST: { // TODO: mv to function
		return !!data;
	}
	// TODO: more type
	default:
		throw new Error("not support type: " + type);
	}
};
