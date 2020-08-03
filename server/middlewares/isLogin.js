const httpErrors = require("http-errors");

module.exports = function(req, res, next) {
	if (!req.user) {
		return next(httpErrors(401));
	}

	next();
};
