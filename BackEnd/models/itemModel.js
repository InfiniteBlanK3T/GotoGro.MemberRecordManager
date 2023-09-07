const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/dbConnection");

const Item = sequelize.define(
  "Item",
  {
    ItemId: {
      type: DataTypes.STRING(10),
      allowNull: false,
      primaryKey: true,
      validate: {
        notEmpty: {
          msg: "ItemId is required",
        },
      },
    },
    SaleId: {
      type: DataTypes.STRING(10),
      allowNull: false,
      references: {
        model: "Sales",
        key: "SaleId",
      },
      validate: {
        notEmpty: {
          msg: "SaleId is required",
        },
      },
    },
    Quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Quantity is required",
        },
        isInt: {
          msg: "Quantity should be an integer",
        },
        min: {
          args: [1],
          msg: "Quantity should be at least 1",
        },
      },
    },
    Name: {
      type: DataTypes.STRING(20),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Name is required",
        },
        len: [1, 20],
      },
    },
    Price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Price is required",
        },
        isFloat: {
          msg: "Price should be a valid number",
        },
        min: {
          args: [0],
          msg: "Price should be a positive value",
        },
      },
    },
  },
  {
    timestamps: false,
    tableName: "Items",
  }
);

module.exports = Item;
