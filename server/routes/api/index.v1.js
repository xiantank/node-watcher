const router = require("express").Router();
const isLogin = require("../../middlewares/isLogin.js");

router.use("/login", require("./login"));

router.use(isLogin);
router.use("/logout", require("./logout"));
router.use("/users", require("./user"));
router.use("/crawlers", require("./crawler"));
router.use("/notifications", require("./notifications"));

module.exports = router;
