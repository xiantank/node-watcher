const { validationResult } = require("express-validator");
const httpErrors = require("http-errors");

module.exports = function (req, res, next) {
	const result = validationResult(req);
	if (!result.isEmpty()) {
		const error = result.errors[0];
		const errorMessage = `${error.msg}: ${error.param}`;

		return next(httpErrors(422, errorMessage));
	}

	next();
};
