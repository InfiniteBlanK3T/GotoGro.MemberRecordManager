const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../config/dbConnection");

const User = sequelize.define(
	"User",
	{
		Username: {
			type: DataTypes.STRING(10),
			allowNull: false,
			primaryKey: true,
		},
		MemberId: {
			type: DataTypes.STRING(10),
			allowNull: false,
			references: {
				model: "Members",
				key: "MemberId",
			},
		},
		Password: {
			type: DataTypes.STRING(255),
			allowNull: false,
			validate: {
				min: {
					args: 5,
					msg: "Password must be more than 5 characters",
				},
				notEmpty: {
					msg: "Password field cannot be empty",
				},
			},
		},
		RoleId: {
			type: DataTypes.STRING(10),
			allowNull: false,
			references: {
				model: "Roles",
				key: "RoleId",
			},
		},
	},
	{
		timestamps: false,
		tableName: "Users",
	}
);

module.exports = User;
