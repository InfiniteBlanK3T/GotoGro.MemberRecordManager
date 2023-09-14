"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("Items", {
			ItemId: {
				type: Sequelize.STRING(10),
				allowNull: false,
				primaryKey: true,
			},
			SaleId: {
				type: Sequelize.STRING(10),
				allowNull: false,
				references: {
					model: "Sales",
					key: "SaleId",
				},
				validate: {
					len: [10, 10],
				},
			},
			Quantity: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			Name: {
				type: Sequelize.STRING(20),
				allowNull: false,
				validate: {
					len: [1, 20],
				},
			},
			Price: {
				type: Sequelize.FLOAT,
				allowNull: false,
			},
		});
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable("Items");
	},
};
