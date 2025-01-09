const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');
const Device = require('./Device');

const Cart = sequelize.define('cart', {
  idCustomer: {
    type: DataTypes.STRING(12),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    references: {
      model: 'customer',
      key: 'id'
    }
  },
  idDevice: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    references: {
      model: 'device',
      key: 'idDevice'
    }
  },
  quantity: {
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
        { name: "idCustomer",  name: "idDevice" },
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

Device.hasMany(Cart, { foreignKey: 'idDevice', as: 'carts' })
Cart.belongsTo(Device, { foreignKey: 'idDevice', as: 'device' });

module.exports = Cart;