const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');

const Employee = sequelize.define('employee', {
  id: {
    type: DataTypes.STRING(12),
    allowNull: false,
    primaryKey: true
  },
  surname: {
    type: DataTypes.STRING(500),
    allowNull: true
  },
  lastname: {
    type: DataTypes.STRING(500),
    allowNull: true
  },
  // identityNumber: {
  //   type: DataTypes.STRING(500),
  //   allowNull: true
  // },
  email: {
    type: DataTypes.STRING(500),
    allowNull: true
  },
  birthdate: {
    type: DataTypes.DATEONLY,
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
  gender: {
    type: DataTypes.BOOLEAN,
    allowNull: true
  },
  status: {
    type: DataTypes.TINYINT,
    allowNull: true
  }
}, {
  sequelize,
  tableName: 'employee',
  timestamps: true, 
  createdAt: 'created_at',

  updatedAt: false,
  indexes: [
    {
      name: "PRIMARY",
      unique: true,

      using: "BTREE",
      fields: [
        { name: "id" },
      ]
    },
  ]
});



module.exports = Employee;