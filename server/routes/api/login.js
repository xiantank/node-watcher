const router = require("express").Router();
const {
	user,
	validateResult,
} = require("../../middlewares/validators");
const {
	authenticatePasswordLoginCredentials,
} = require("../../middlewares/authenticate");
router.post(
	"/",
	[
		user.checkUsername,
		user.checkPassword,
		validateResult,
	],
	authenticatePasswordLoginCredentials,
	function(req, res) {
		res.status(201).json(req.user);
	}
);

module.exports = router;
