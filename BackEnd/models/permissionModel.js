const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../config/dbConnection");

const Permissions = sequelize.define(
	"Permission",
	{
		PermissionId: {
			type: DataTypes.STRING(10),
			allowNull: false,
			primaryKey: true,
		},
		Name: {
			type: DataTypes.STRING(50),
			allowNull: false,
			validate: {
				min: {
					args: 3,
					msg: "Permission Name must be more than 3 characters",
				},
				notEmpty: {
					msg: "Permission Name should not be empty",
				},
			},
		},
	},
	{
		timestamps: false,
		tableName: "Permissions",
	}
);

module.exports = Permissions;
