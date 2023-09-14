"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("Permissions", {
			EmployeeId: {
				type: Sequelize.STRING(10),
				allowNull: false,
				primaryKey: true,
				references: {
					model: "Employees",
					key: "EmployeeId",
				},
			},
			Level: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			UserName: {
				type: Sequelize.STRING(20),
				allowNull: false,
				unique: true,
				validate: {
					len: [5, 20],
				},
			},
			Password: {
				type: Sequelize.STRING(20),
				allowNull: false,
				validate: {
					len: [8, 20],
				},
			},
		});
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable("Permissions");
	},
};
