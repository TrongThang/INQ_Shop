const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');

const Account = sequelize.define('account', {
  idPerson: {
    type: DataTypes.STRING(12),
    allowNull: false,
    primaryKey: true,
    references: {
      model: 'employee',
      key: 'id'
    }
  },
  username: {
    type: DataTypes.STRING(30),
    allowNull: false,
    unique: "username"
  },
  password: {
    type: DataTypes.STRING(30),
    allowNull: true
  },
  report: {
    type: DataTypes.TINYINT,
    allowNull: true
  },
  idRole: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'role',
      key: 'id'
    }
  },
  status: {
    type: DataTypes.TINYINT,
    allowNull: true
  },
  isNew: {
    type: DataTypes.BOOLEAN,
    allowNull: true
  }
}, {
  sequelize,
  tableName: 'account',
  timestamps: false,
  indexes: [
    {
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "idPerson" },
      ]
    },
    {
      name: "username",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "username" },
      ]
    },
    {
      name: "Account_Role_fk",
      using: "BTREE",
      fields: [
        { name: "idRole" },
      ]
    },
  ]
});

module.exports = Account;