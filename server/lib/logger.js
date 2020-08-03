const { format, createLogger, transports } = require("winston");
const logger = createLogger({
	transports: [
		new transports.File({
			filename: "error.log",
			level: "error",
			format: format.combine(
				format.timestamp(),
				format.json(),
			),
		}),
	],
});

if (process.env.NODE_ENV !== "production") {
	logger.add(new transports.Console({
		level: process.env.CONSOLE_LEVEL,
		format: format.combine(
			format.timestamp(),
			format.simple(),
		),
	}));
}

module.exports = logger;
