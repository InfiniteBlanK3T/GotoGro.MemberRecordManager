"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Sales", {
      SaleId: {
        type: Sequelize.STRING(10),
        allowNull: false,
        primaryKey: true,
      },
      MemberId: {
        type: Sequelize.STRING(10),
        allowNull: false,
        references: {
          model: "Members",
          key: "MemberId",
        },
      },
      ReceiptNumber: {
        type: Sequelize.STRING(10),
        allowNull: false,
        unique: true,
      },
      SaleDate: {
        type: Sequelize.DATEONLY,
        allowNull: false,
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
