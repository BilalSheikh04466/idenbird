const Sequelize = require("sequelize");

const sequelize = new Sequelize("color_management", "root", "root@123", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
