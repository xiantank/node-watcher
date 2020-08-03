const Sequelize = require("sequelize");
const {
	CRAWLER_PARSE_ATTRIBUTES,
	CRAWLER_COMPARE_TYPE,
	CRAWLER_INTERVAL_TYPE,
} = require("../enum");

const schema = {
	name: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	interval_type: {
		type: Sequelize.INTEGER,
		allowNull: false,
		defaultValue: CRAWLER_INTERVAL_TYPE.NONE,
	},
	url: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	parser: {
		type: Sequelize.STRING,
		allowNull: true,
	},
	parse_attributes: {
		type: Sequelize.INTEGER,
		allowNull: true,
		defaultValue: CRAWLER_PARSE_ATTRIBUTES.TEXT,
	},
	target: {
		type: Sequelize.STRING,
		allowNull: true,
	},
	compare_type: {
		type: Sequelize.INTEGER,
		allowNull: true,
		defaultValue: CRAWLER_COMPARE_TYPE.EQUAL,
	},
	user_id: {
		type: Sequelize.INTEGER,
		allowNull: false,
		references: {
			model: "users",
			key: "id",
		},
	},

};

const options = {
	indexes:[
		{
			fields: ["interval_type"],
		},
		{
			fields: ["user_id"],
		},
	],
};

const sequelize = require("../lib/db").getDB();
const model = sequelize.define("crawlers", schema, options);

module.exports = model;
