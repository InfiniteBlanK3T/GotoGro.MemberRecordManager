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
			type: DataTypes.STRING(200),
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
	},
	{
		timestamps: false,
		tableName: "Feedbacks", //might need to change this to Feedback as currently the DB create script makes the table with the feedback name 
	}
);

module.exports = Feedback;
