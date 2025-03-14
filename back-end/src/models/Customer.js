const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');
const Account = require('./Account');
const Address_book = require('./Address_book');

const Customer = sequelize.define('customer', {
  id: {
    type: DataTypes.STRING(12),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  surname: {
    type: DataTypes.STRING(500),
    allowNull: true
  },
  lastName: {
    type: DataTypes.STRING(500),
    allowNull: true
  },
  image: {
    type: DataTypes.STRING(500),
    allowNull: true
  },
  phone: {
    type: DataTypes.STRING(500),
    allowNull: true
  },
  birthdate: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  gender: {
    type: DataTypes.BOOLEAN,
    allowNull: true
  },
  email: {
    type: DataTypes.STRING(500),
    allowNull: true
  },
  status: {
    type: DataTypes.TINYINT,
    allowNull: true
  }
}, {
  sequelize,
  tableName: 'customer',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
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
      name: "identityNumber",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "identityNumber" },
      ]
    },
  ]
});

Customer.belongsTo(Account, { foreignKey: 'id', as: 'account' })

Customer.hasMany(Address_book, { foreignKey: 'idCustomer', as: 'address' });
Address_book.belongsTo(Customer, { foreignKey: 'idCustomer', as: 'customer' });

module.exports = Customer;