const Sequelize = require("sequelize");
const sequelize = new Sequelize("inq_shop", "root", "", {
    host: "localhost",
    dialect: "mysql",
});

module.exports = sequelize;
