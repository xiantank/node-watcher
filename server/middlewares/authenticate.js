const passport = require("../lib/passport");

function authenticatePasswordLoginCredentials(req, res, next) {
	return passport.authenticateManagementCredentials(req, res, next);
}


module.exports = {
	authenticatePasswordLoginCredentials,
};
