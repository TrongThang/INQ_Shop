const Sequelize = require("sequelize");
const sequelize = new Sequelize("INQ_SHOP", "root", "", {
    host: "localhost",
    dialect: "mysql",
    logging: console.log, 
});

module.exports = sequelize;
