const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');

const Warehouse = sequelize.define('warehouse', {
  idDevice: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    references: {
      model: 'device',
      key: 'idDevice'
    }
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  note: {
    type: DataTypes.STRING(500),
    allowNull: true
  },
  status: {
    type: DataTypes.TINYINT,
    allowNull: true
  }
}, {
  sequelize,
  tableName: 'warehouse',
  timestamps: true,
  indexes: [
    {
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "idDevice" },
      ]
    },
  ]
});

module.exports = Warehouse;