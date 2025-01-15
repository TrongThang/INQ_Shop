const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');

const Liked = sequelize.define('liked', {
  idCustomer: {
    type: DataTypes.STRING(12),
    allowNull: false,
    primaryKey: true,
    references: {
      model: 'customer',
      key: 'id'
    }
  },
  idDevice: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'device',
      key: 'idDevice'
    }
  }
}, {
  sequelize,
  tableName: 'liked',
  timestamps: false,
  indexes: [
    {
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "idCustomer" },
      ]
    },
    {
      name: "Device_Liked_fk",
      using: "BTREE",
      fields: [
        { name: "idDevice" },
      ]
    },
  ]
});

const Device = require('../models/Device');
Device.belongsTo(Liked, { foreignKey: 'idDevice', as: 'liked' });
Liked.belongsTo(Device, { foreignKey: 'idDevice', as: 'device' });

module.exports = Liked;