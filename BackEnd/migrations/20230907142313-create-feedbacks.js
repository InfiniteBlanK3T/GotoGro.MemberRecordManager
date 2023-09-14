"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
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
				type: Sequelize.STRING(200),
				allowNull: false,
				validate: {
					notEmpty: {
						msg: "Comment should not be empty.",
					},
					len: {
						args: [5, 200],
						msg: "Comment should be between 5 and 200 characters.",
					},
				},
			},
		});
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable("Feedbacks");
	},
};
