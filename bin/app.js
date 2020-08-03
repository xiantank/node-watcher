const logger = require("../server/lib/logger");

require("dotenv").config();

require("../server/lib/db").connect(process.env.MYSQL_URL).then(async () => {
	const app = require("../server/app");

	require("./www")(app, process.env.PORT);
}).catch(error => {
	logger.error("[app]", error);
});
