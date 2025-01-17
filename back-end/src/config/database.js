const Sequelize = require("sequelize");
const sequelize = new Sequelize("INQ_SHOP", "root", "", {
    host: "localhost",
    dialect: "mysql",
    logging: console.log, 
    timezone: '+07:00',
});

module.exports = sequelize;
