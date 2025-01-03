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

module.exports = Liked;