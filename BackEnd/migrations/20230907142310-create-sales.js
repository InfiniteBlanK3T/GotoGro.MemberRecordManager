"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("Sales", {
			SaleId: {
				type: Sequelize.STRING(10),
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
				validate: {
					len: [10, 10],
				},
			},
			MemberId: {
				type: Sequelize.STRING(10),
				allowNull: false,
				validate: {
					len: [10, 10],
				},
				references: {
					model: "Members",
					key: "MemberId",
				},
			},
			ReceiptNumber: {
				type: Sequelize.STRING(10),
				allowNull: false,
				unique: true,
				validate: {
					len: [10, 10],
				},
			},
			SaleDate: {
				type: Sequelize.DATEONLY,
				allowNull: false,
				validate: {
					isDate: true,
					isBefore: "2100-01-01",
					isAfter: "1900-01-01",
				},
			},
			PaymentMethod: {
				type: Sequelize.STRING(20),
				allowNull: false,
			},
		});
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable("Sales");
	},
};
