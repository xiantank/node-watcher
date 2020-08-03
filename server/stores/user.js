const sequelize = require("../lib/db").getDB();
const model = require("../models/user");
const httpErrors = require("http-errors");
const bcrypt = require("bcrypt");
const SALT_ROUNDS = 10;
const USER_PROJECTIONS = ["id", "username", "type"];
const USER_WITH_CREDENTIAL_PROJECTIONS = ["id", "username", "password", "type"];

async function create({ username, password: plainTextPassword, type}) {
	const password = await bcrypt.hash(plainTextPassword, SALT_ROUNDS);

	return model.create({
		username, password, type
	});
}

function getAll(page, limit, { projections = [] } = {}) {
	return model.findAll({
		offset: (page - 1) * limit,
		limit,
		attributes: projections,
	});
}

function getById(id, { projections = USER_PROJECTIONS } = {}) {
	return model.findOne({
		where: {
			id,
		},
		attributes: projections,
	});
}

function getByUsername(username, { projections = USER_PROJECTIONS} = {}) {
	return model.findOne({
		where: {
			username,
		},
		attributes: projections,
	});
}

async function updatePassword(id, oldplainTextPassword, plainTextPassword) {
	const t = await sequelize.transaction();

	try {
		const user = await model.findOne({
			where: {
				id,
			},
			lock: true,
			transaction: t,
		});
		if (!user.validPassword(oldplainTextPassword)) {
			throw httpErrors(401, { message: "invalid password" });
		}

		const password = await bcrypt.hash(plainTextPassword, SALT_ROUNDS);

		const [count] = await model.update({
			password,
		}, {
			where: {
				id,
			},
			transaction: t,
		});

		await t.commit();

		if (count !== 0) {
			return true;
		}

		return false;
	} catch (error) {
		await t.rollback();

		throw error;
	}
}
module.exports = {
	create,
	getAll,
	getById,
	getByUsername,
	updatePassword,

	USER_PROJECTIONS,
	USER_WITH_CREDENTIAL_PROJECTIONS,
};
