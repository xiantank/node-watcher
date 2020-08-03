const session = require("express-session");
const Redis = require("ioredis");
const RedisStore = require("connect-redis")(session);

const logger = require("./lib/logger");

module.exports = (options = {}) => {
	options.resave = false;
	options.saveUninitialized = false;

	switch (process.env.SESSION_STORAGE) {
	case "redis":
		options.store = new RedisStore({
			client: Redis.createClient(process.env.REDIS_URL)
		});
		logger.info("use redis as session storage");
		break;
	case "local":
	default:
		logger.info("use local as session storage");
		break;
	}

	return session(options);
};
