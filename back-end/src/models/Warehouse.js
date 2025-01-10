const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');
const Device = require('./Device');

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
  createdAt: 'created_at',
  updatedAt: 'updated_at',
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

Warehouse.hasOne(Device, {foreignKey: 'idDevice', as: 'device'})
Device.belongsTo(Warehouse, { foreignKey: 'idDevice', as: 'warehouse' })

module.exports = Warehouse;