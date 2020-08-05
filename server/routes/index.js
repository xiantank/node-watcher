const router = require("express").Router();

router.use("/api/v1", require("./api/index.v1"));

module.exports = router;
