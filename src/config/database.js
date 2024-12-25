const Sequelize = require("sequelize");
const sequelize = new Sequelize("INQ_SHOP", "root", "", {
    host: "localhost",
    dialect: "mysql",
});

module.exports = sequelize;
