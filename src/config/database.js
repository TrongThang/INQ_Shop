const Sequelize = require("sequelize");
const sequelize = new Sequelize("INQ_Shop", "root", "", {
    host: "localhost",
    dialect: "mysql",
});

module.exports = sequelize;
