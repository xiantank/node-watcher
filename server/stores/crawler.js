const model = require("../models/crawler");

function create(crawler) {
	return model.create(crawler);
}

function getWithinIntervalTypes(intervalTypes) {
	return model.findAll({
		where: {
			interval_type: intervalTypes,
		},
	});
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

async function updateIntervalTypeByIdAndUserId(id, user_id, interval_type) {
	const [count] = await model.update({ interval_type }, {
		where: {
			id,
			user_id,
		},
	});

	if (count === 0) {
		return false;
	}

	return true;
}

module.exports = {
	create,
	getWithinIntervalTypes,
	getAllByUserId,
	getByIdAndUserId,
	updateIntervalTypeByIdAndUserId,
};
