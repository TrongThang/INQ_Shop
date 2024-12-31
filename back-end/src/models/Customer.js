const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');

const Customer = sequelize.define('customer', {
  id: {
    type: DataTypes.STRING(12),
    allowNull: false,
    primaryKey: true
  },
  surname: {
    type: DataTypes.STRING(500),
    allowNull: true
  },
  lastName: {
    type: DataTypes.STRING(500),
    allowNull: true
  },
  phone: {
    type: DataTypes.STRING(500),
    allowNull: true
  },
  identityNumber: {
    type: DataTypes.STRING(500),
    allowNull: true,
    unique: "identityNumber"
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

Customer.beforeCreate(async (instance, options) => {
  console.log("Hook beforeCreate được kích hoạt");
  const lastCustomer = await Customer.findOne({
    attributes: ['id'],
    order: [['id', 'DESC']],
    where: { id: { [Sequelize.Op.like]: 'KH-%' } }
  });

  const lastId = lastCustomer ? parseInt(lastCustomer.id.replace('KH-', ''), 10) : 0;
  const newId = `KH-${lastId + 1}`;
  console.log("Generated ID:", newId);
  instance.id = newId;
});


module.exports = Customer;