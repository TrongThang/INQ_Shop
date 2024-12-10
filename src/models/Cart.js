const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');

const Cart = sequelize.define('cart', {
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
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
}, {
  sequelize,
  tableName: 'cart',
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
      name: "Device_Cart_fk",
      using: "BTREE",
      fields: [
        { name: "idDevice" },
      ]
    },
  ]
});

module.exports = Cart;