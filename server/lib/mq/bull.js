const Bull = require("bull");

const clients = {};
const options = {};

async function connect(endpoint) {
	options.endpoint = endpoint;

	return clients;
}

function getQueue(topic) {
	if (clients[topic] !== undefined) {
		return clients[topic];
	}

	clients[topic] = new Bull(topic, options.endpoint);

	return clients[topic];
}

async function publish(topic, messages) {
	const client = getQueue(topic);

	if (!Array.isArray(messages)) {
		return client.add(messages);
	}

	return client.addBulk(messages);
}

function subscribe(topic, callback) {
	const client = getQueue(topic);

	return client.process(callback);
}

function getMQ(topic) {
	if (clients[topic]) {
		return clients[topic];
	} else {
		throw new Error("[mq] unconnected: " + topic);
	}
}

module.exports = {
	connect,
	subscribe,
	publish,
	getMQ,
};
