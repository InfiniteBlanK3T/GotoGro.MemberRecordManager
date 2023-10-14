"use strict";

const { QueryError } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		//Creating Members Table
		await queryInterface.createTable("Members", {
			MemberId: {
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
		//Creating Sales Table
		await queryInterface.createTable("Sales", {
			SaleId: {
				type: Sequelize.STRING(10),
				allowNull: false,
				primaryKey: true,
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
					isAfter: "2010-01-01",
				},
			},
			PaymentMethod: {
				type: Sequelize.STRING(20),
				allowNull: false,
			},
		});
		//Creating Feedbacks Table
		await queryInterface.createTable("Feedbacks", {
			FeedbackId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
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
			Comment: {
				type: Sequelize.TEXT,
				allowNull: false,
				validate: {
					notEmpty: {
						msg: "Comment should not be empty.",
					},
				},
			},
		});
		//Creating Items Table
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
		//Creating Roles Table
		await queryInterface.createTable("Roles", {
			RoleId: {
				type: Sequelize.STRING(10),
				allowNull: false,
				primaryKey: true,
			},
			Name: {
				type: Sequelize.STRING(50),
				allowNull: false,
				validate: {
					notEmpty: {
						msg: "Role's Name cannot be empty",
					},
				},
			},
		});
		//Creating Users Table
		await queryInterface.createTable("Users", {
			Username: {
				type: Sequelize.STRING(10),
				allowNull: false,
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
			Password: {
				type: Sequelize.STRING(255),
				allowNull: false,
				validate: {
					len: [5, 20],
				},
			},
			RoleId: {
				type: Sequelize.STRING(10),
				allowNull: false,
				references: {
					model: "Roles",
					key: "RoleId",
				},
			},
		});
		//Creating Permissions Table
		await queryInterface.createTable("Permissions", {
			PermissionId: {
				type: Sequelize.STRING(10),
				allowNull: false,
				primaryKey: true,
			},
			Name: {
				type: Sequelize.STRING(50),
				allowNull: false,
				validate: {
					notEmpty: {
						msg: "Permission's Name cannot be empty",
					},
				},
			},
		});
		//Creating RolePermissionMapping Table
		await queryInterface.createTable("RolePermissionMapping", {
			RoleId: {
				type: Sequelize.STRING(10),
				allowNull: false,
				primaryKey: true,
				references: {
					model: "Roles",
					key: "RoleId",
				},
			},
			PermissionId: {
				type: Sequelize.STRING(10),
				allowNull: false,
				primaryKey: true,
				references: {
					model: "Permissions",
					key: "PermissionId",
				},
			},
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("Members");
		await queryInterface.dropTable("Sales");
		await queryInterface.dropTable("Feedbacks");
		await queryInterface.dropTable("Items");
		await queryInterface.dropTable("Roles");
		await queryInterface.dropTable("Users");
		await queryInterface.dropTable("Permission");
		await queryInterface.dropTable("RolePermissionMapping");
	},
};
