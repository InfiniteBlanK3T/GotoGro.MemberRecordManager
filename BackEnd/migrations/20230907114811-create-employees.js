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
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      LastName: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      Phone: {
        type: Sequelize.STRING(10),
        allowNull: false,
      },
      Email: {
        type: Sequelize.STRING(20),
        allowNull: false,
        unique: true,
      },
      StreetNumber: {
        type: Sequelize.STRING(5),
        allowNull: false,
      },
      StreetName: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      Suburb: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      PostCode: {
        type: Sequelize.STRING(10),
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Employees");
  },
};
