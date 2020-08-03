class ServiceLocator {
	constructor() {
		this.services = {};
	}
	resolve(name) {
		return this.get(name);
	}
	get(name) {
		if (this.services[name] === undefined) {
			throw new Error(name + ": not exist");
		}

		return this.services[name];
	}
	register(name, service) {
		return this.add(name, service);
	}
	add(name, service) {
		if (this.services[name] !== undefined) {
			throw new Error(name + ": exist");
		}

		this.services[name] = service;
	}
	remove(name) {
		delete this.services[name];
	}
}

module.exports = ServiceLocator;
