//Thông tin về 1 tài khoản bao gồm username, password của - KHÁCH HÀNG hoặc NHÂN VIÊN
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Account = sequelize.define('Blog', {
    idPerson: {
        type: DataTypes.STRING(12),
        primaryKey: true,
        references: { model: Employee, key: id},
        references: { model: Customer, key: id},
    },
    username: {
        type: DataTypes.STRING(30),
        allowNull: false, 
        unique: true,
        validate: {
            len: [6, 30]
        }
    },
    password: {
        type: DataTypes.STRING(30), 
        allowNull: false
    },
    report: { type: DataTypes.TINYINT },
    isNew: { type: DataTypes.BOOLEAN },
    status: { type: DataTypes.TINYINT },
});

module.exports = {
    Account
}