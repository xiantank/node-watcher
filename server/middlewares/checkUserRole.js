const httpErrors = require("http-errors");
const { USER_TYPE } = require("../enum");

module.exports = function(roles = []) {
	return function (req, res, next) {
		if (req.user && (roles.includes(req.user.type) || req.user.type === USER_TYPE.ADMIN)) {
			return next();
		}

		next(httpErrors(403));
	};
};
