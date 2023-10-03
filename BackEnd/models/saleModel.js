const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../config/dbConnection");

const Sales = sequelize.define(
	"Sale",
	{
		SaleId: {
			type: DataTypes.STRING(10),
			allowNull: false,
			primaryKey: true,
			validate: {
				notEmpty: {
					msg: "SaleId is required",
				},
			},
		},
		MemberId: {
			type: DataTypes.STRING(10),
			allowNull: false,
			references: {
				model: "Members",
				key: "MemberId",
			},
			validate: {
				notEmpty: {
					msg: "MemberId is required",
				},
			},
		},
		ReceiptNumber: {
			type: DataTypes.STRING(10),
			unique: true,
			allowNull: false,
			validate: {
				notEmpty: {
					msg: "ReceiptNumber is required",
				},
			},
		},
		SaleDate: {
			type: DataTypes.DATEONLY,
			allowNull: false,
			validate: {
				notEmpty: {
					msg: "SaleDate is required",
				},
				isDate: {
					msg: "SaleDate should be a valid date",
				},
				isBefore: "2100-01-01",
				isAfter: "2010-01-01",
			},
		},
		PaymentMethod: {
			type: DataTypes.STRING(20),
			allowNull: false,
			validate: {
				notEmpty: {
					msg: "PaymentMethod is required",
				},
				isIn: {
					args: [["cash", "credit", "eftpos", "voucher", "online"]],
					msg: "PaymentMethod should be one of 'cash', 'credit', 'eftpos', 'voucher',  or 'online'",
				},
			},
		},
	},
	{
		timestamps: false,
		tableName: "Sales",
	}
);

module.exports = Sales;
