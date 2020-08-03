const router = require("express").Router();

router.post("/", (req, res) => {
	req.logout();

	res.status(201).end();
});

module.exports = router;
