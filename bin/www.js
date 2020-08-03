const http = require("http");
const logger = require("../server/lib/logger");

module.exports = function (app, port) {
	app.set("port", port);
	const server = http.createServer(app);

	server.listen(port);
	server.on("error", onError);
	server.on("listening", onListening);
	process.on("SIGTERM", () => {
		server.close((error) => {
			if (error) {
				logger.error("graceful shutdown fail: ", error);

				return process.exit(1);
			}

			process.exit();
		});
	});


	function onError(error) {
		if (error.syscall !== "listen") {
			throw error;
		}

		var bind = typeof port === "string"
			? "Pipe " + port
			: "Port " + port;

		// handle specific listen errors with friendly messages
		switch (error.code) {
		case "EACCES":
			console.error(bind + " requires elevated privileges");
			process.exit(1);
			break;
		case "EADDRINUSE":
			console.error(bind + " is already in use");
			process.exit(1);
			break;
		default:
			throw error;
		}
	}

	/**
 * Event listener for HTTP server "listening" event.
 */

	function onListening() {
		var addr = server.address();
		var bind = typeof addr === "string"
			? "pipe " + addr
			: "port " + addr.port;
		logger.info("Listening on " + bind);
	}
};

