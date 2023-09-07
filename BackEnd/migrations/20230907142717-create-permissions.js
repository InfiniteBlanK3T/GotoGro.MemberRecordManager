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
      },
      Password: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Permissions");
  },
};
