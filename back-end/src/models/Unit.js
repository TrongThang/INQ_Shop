const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const DonViTinh = sequelize.define('DonViTinh', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
}, {
    tableName: 'unit',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    timestamps: true,
    paranoid: true,
});




