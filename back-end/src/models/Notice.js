const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');

const Notice = sequelize.define('notice', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  idUser: {
    type: DataTypes.STRING(12),
    allowNull: true,
    references: {
      model: 'account',
      key: 'idPerson'
    }
  },
  text: {
    type: DataTypes.STRING(500),
    allowNull: true
  },
  status: {
    type: DataTypes.TINYINT,
    allowNull: true
  }
}, {
  sequelize,
  tableName: 'notice',
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
      name: "Account_Notice_fk",
      using: "BTREE",
      fields: [
        { name: "idUser" },
      ]
    },
  ]
});

module.exports = Notice;