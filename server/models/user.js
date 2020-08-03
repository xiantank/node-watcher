const Sequelize = require("sequelize");
const bcrypt = require("bcrypt");
const { USER_TYPE } = require("../enum");

const schema = {
	username: {
		type: Sequelize.STRING,
		allowNull: false,
		unique: true,
	},
	password: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	type: {
		type: Sequelize.INTEGER,
		allowNull: false,
		defaultValue: USER_TYPE.USER,
	},
};

const options = {
	indexes:[
	],
};

const sequelize = require("../lib/db").getDB();
const model = sequelize.define("users", schema, options);

model.prototype.validPassword = function(password) {
	return bcrypt.compareSync(password, this.password);
};

module.exports = model;
