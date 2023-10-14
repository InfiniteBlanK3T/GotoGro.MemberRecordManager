const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../config/dbConnection");

const RolePermissionMapping = sequelize.define(
	"RoleId",
	{
		RoleId: {
			type: DataTypes.STRING(10),
			allowNull: false,
			primaryKey: true,
			references: {
				model: "Roles",
				key: "RoleId",
			},
		},
		PermissionId: {
			type: DataTypes.STRING(10),
			allowNull: false,
			primaryKey: true,
			references: {
				model: "Permissions",
				key: "PermissionId",
			},
		},
	},
	{
		timestamps: false,
		tableName: "RolePermissionMapping",
	}
);

module.exports = RolePermissionMapping;
