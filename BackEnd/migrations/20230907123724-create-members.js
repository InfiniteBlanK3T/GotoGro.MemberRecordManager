"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Members", {
      MemberId: {
        type: Sequelize.STRING(10),
        allowNull: false,
        primaryKey: true,
      },
      FirstName: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      LastName: {
        type: Sequelize.STRING(50),
        allowNull: false,
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
        type: Sequelize.STRING(20),
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
          len: [5, 20],
        },
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

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Members");
  },
};
