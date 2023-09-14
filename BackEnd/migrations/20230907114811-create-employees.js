"use strict";

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("Employees", {
			EmployeeId: {
				type: Sequelize.STRING(10),
				allowNull: false,
				primaryKey: true,
			},
			FirstName: {
				type: Sequelize.STRING(50),
				allowNull: false,
				validate: {
					len: [1, 50],
				},
			},
			LastName: {
				type: Sequelize.STRING(50),
				allowNull: false,
				validate: {
					len: [1, 50],
				},
			},
			Phone: {
				type: Sequelize.STRING(10),
				allowNull: false,
				validate: {
					len: [10, 10],
					isNumeric: true,
				},
			},
			Email: {
				type: Sequelize.STRING(100),
				allowNull: false,
				unique: true,
				validate: {
					isEmail: true,
					len: [10, 100],
				},
			},
			StreetNumber: {
				type: Sequelize.STRING(5),
				allowNull: true,
				validate: {
					len: [1, 5],
				},
			},
			StreetName: {
				type: Sequelize.STRING(20),
				allowNull: false,
				validate: {
					len: [3, 20],
				},
			},
			Suburb: {
				type: Sequelize.STRING(20),
				allowNull: false,
				validate: {
					len: [3, 20],
				},
			},
			PostCode: {
				type: Sequelize.STRING(4),
				allowNull: false,
				validate: {
					len: [4, 4],
				},
			},
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("Employees");
	},
};
