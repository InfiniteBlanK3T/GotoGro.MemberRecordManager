const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/dbConnection");

const Permissions = sequelize.define(
  "Permission",
  {
    EmployeeId: {
      type: DataTypes.STRING(10),
      allowNull: false,
      primaryKey: true,
      references: {
        model: "Employees",
        key: "EmployeeId",
      },
      validate: {
        notEmpty: {
          msg: "EmployeeId is required",
        },
      },
    },
    Level: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Level is required",
        },
        isInt: {
          msg: "Level should be a valid integer",
        },
        min: {
          args: [1],
          msg: "Level should be greater than or equal to 1",
        },
        max: {
          args: [5],
          msg: "Level should be less than or equal to 5",
        },
      },
    },
    UserName: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          msg: "UserName is required",
        },
        len: {
          args: [5, 20],
          msg: "UserName should be between 5 and 20 characters",
        },
      },
    },
    //Look into Hasing & Salting latter on
    Password: {
      type: DataTypes.STRING(20),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Password is required",
        },
        len: {
          args: [8, 20],
          msg: "Password should be between 8 and 20 characters",
        },
      },
    },
  },
  {
    timestamps: false,
    tableName: "Permissions",
  }
);

module.exports = Permissions;
