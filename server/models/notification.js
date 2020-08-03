const Sequelize = require("sequelize");
const { IM_TYPE } = require("../enum");

const schema = {
	user_id: {
		type: Sequelize.INTEGER,
		allowNull: false,
		unique: true,
		references: {
			model: "users",
			key: "id",
		},
	},
	im_type: {
		type: Sequelize.STRING,
		allowNull: false,
		defaultValue: IM_TYPE.TELEGRAM,
	},
	token: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	options: {
		type: Sequelize.JSON,
		allowNull: false,
		defaultValue: {},
	},
};

const options = {
	indexes:[
	],
};

const sequelize = require("../lib/db").getDB();
const model = sequelize.define("notifications", schema, options);

module.exports = model;
