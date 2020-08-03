const logger = require("./server/lib/logger");

require("dotenv").config();

require("./server/fixtures")().then(() => {
	logger.info("[mysql] fixtures done");
	process.exit();
});
