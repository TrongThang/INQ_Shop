const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');

const Order =sequelize.define('order', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  idCustomer: {
    type: DataTypes.STRING(12),
    allowNull: true,
    references: {
      model: 'customer',
      key: 'id'
    }
  },
  totalAmount: {
    type: DataTypes.DECIMAL(19,4),
    allowNull: true
  },
  paymentMethod: {
    type: DataTypes.STRING(500),
    allowNull: true
  },
  address: {
    type: DataTypes.STRING(500),
    allowNull: true
  },
  phone: {
    type: DataTypes.STRING(500),
    allowNull: true
  },
  nameRecipient: {
    type: DataTypes.STRING(500),
    allowNull: true
  },
  note: {
    type: DataTypes.STRING(500),
    allowNull: true
  },
  platformOrder: {
    type: DataTypes.STRING(500),
    allowNull: true
  },
  accept_at: {
    type: DataTypes.DATE,
    allowNull: true
  },
  idAdmin: {
    type: DataTypes.STRING(12),
    allowNull: true,
    references: {
      model: 'employee',
      key: 'id'
    }
  },
  status: {
    type: DataTypes.TINYINT,
    allowNull: true
  }
}, {
  sequelize,
  tableName: 'order',
  timestamps: true,
  indexes: [
    {
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "id" },
      ]
    },
    {
      name: "Order_Customer_fk",
      using: "BTREE",
      fields: [
        { name: "idCustomer" },
      ]
    },
    {
      name: "Order_Employee_fk",
      using: "BTREE",
      fields: [
        { name: "idAdmin" },
      ]
    },
  ]
});

module.exports = Order 