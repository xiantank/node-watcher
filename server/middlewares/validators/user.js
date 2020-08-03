const { check } = require("express-validator");


module.exports = {
	checkUsername: check("username").isAscii().isLength({ min: 4, max: 32 }),
	checkPassword: check("password").isString().isLength({ min: 6, max: 32 }),
};
