const Sequelize = require("sequelize");

const sequelize = new Sequelize("swe200001", "root", "", {
  host: "127.0.0.1",
  dialect: "mysql",
  logging: false,
});

module.exports = sequelize;
