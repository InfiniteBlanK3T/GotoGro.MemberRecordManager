const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../config/dbConnection");

const Employee = sequelize.define(
	"Employee",
	{
		EmployeeId: {
			type: DataTypes.STRING(10),
			allowNull: false,
			primaryKey: true,
		},
		FirstName: {
			type: DataTypes.STRING(50),
			allowNull: false,
			validate: {
				len: [1, 50],
				notEmpty: {
					msg: "FirstName is required",
				},
			},
		},
		LastName: {
			type: DataTypes.STRING(50),
			allowNull: false,
			validate: {
				len: [1, 50],
				notEmpty: {
					msg: "LastName is required",
				},
			},
		},
		Phone: {
			type: DataTypes.STRING(10),
			allowNull: false,
			validate: {
				len: [10, 10],
				isNumeric: true,
				notEmpty: {
					msg: "Phone is required",
				},
			},
		},
		Email: {
			type: DataTypes.STRING(100),
			allowNull: false,
			unique: true,
			validate: {
				isEmail: true,
				len: [10, 100],
				notEmpty: {
					msg: "Provide valid email",
				},
			},
		},
		StreetNumber: {
			type: DataTypes.STRING(5),
			allowNull: true,
			validate: {
				len: [1, 5],
				notEmpty: {
					msg: "StreetNumber is required",
				},
			},
		},
		StreetName: {
			type: DataTypes.STRING(20),
			allowNull: false,
			validate: {
				len: [3, 20],
				notEmpty: {
					msg: "StreetName is required",
				},
			},
		},
		Suburb: {
			type: DataTypes.STRING(20),
			allowNull: false,
			validate: {
				len: [3, 20],
				notEmpty: {
					msg: "Suburb is required",
				},
			},
		},
		PostCode: {
			type: DataTypes.STRING(4),
			allowNull: true,
			validate: {
				len: [4, 4],
				notEmpty: {
					msg: "PostCode is required",
				},
			},
		},
	},
	{
		timestamps: false,
		tableName: "Employees",
	}
);

module.exports = Employee;
