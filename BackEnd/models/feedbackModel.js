const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../config/dbConnection");

const Feedback = sequelize.define(
	"Feedback",
	{
		FeedbackId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
		},
		MemberId: {
			type: DataTypes.STRING(10),
			allowNull: false,
			references: {
				model: "Members",
				key: "MemberId",
			},
		},
		Comment: {
			type: DataTypes.TEXT,
			allowNull: false,
			validate: {
				notEmpty: {
					msg: "Comment should not be empty.",
				},
			},
		},
	},
	{
		timestamps: false,
		tableName: "Feedbacks",
	}
);

module.exports = Feedback;
