const model = require("../models/notification");

function create(notification) {
	return model.create(notification);
}

function upsert(notification) {
	return model.upsert(notification);
}

function getAllByUserId(userId) {
	return model.findAll({
		where: {
			user_id: userId,
		},
	});
}

function getByIdAndUserId(id, userId) {
	return model.findOne({
		wherre: {
			id,
			user_id: userId,
		},
	});
}

function getByUserId(userId) {
	return model.findOne({
		where: {
			user_id: userId,
		}
	});
}

module.exports = {
	create,
	upsert,
	getAllByUserId,
	getByIdAndUserId,
	getByUserId,
};
