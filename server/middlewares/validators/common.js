const { query, param } = require("express-validator");
const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;
const MAX_LIMIT = 200;

module.exports = {
	checkPage: query("page").customSanitizer((value) => {
		let page = parseInt(value || DEFAULT_PAGE, 10);
		if (Number.isNaN(page) || page <= 0) page = DEFAULT_PAGE;

		return page;
	}).isInt(),
	checkLimit: query("limit").customSanitizer((value) => {
		let limit = parseInt(value || DEFAULT_LIMIT, 10);
		if (Number.isNaN(limit) || limit <= 0 || limit > MAX_LIMIT) limit = DEFAULT_LIMIT;

		return limit;
	}).isInt(),
	checkIdInParam: param("id").isInt({ min: 1 }),
};
