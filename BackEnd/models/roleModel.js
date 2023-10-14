const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../config/dbConnection");

const Role = sequelize.define(
	"Roles",
	{
		RoleId: {
			type: DataTypes.STRING(10),
			allowNull: false,
			primaryKey: true,
		},
		Name: {
			type: DataTypes.STRING(50),
			allowNull: false,
			validate: {
				notEmpty: {
					msg: "Role's Name cannot be empty",
				},
			},
		},
	},
	{
		timestamps: false,
		tableName: "Roles",
	}
);

module.exports = Role;
