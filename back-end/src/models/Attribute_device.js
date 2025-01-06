const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');

const AttributeDevice = sequelize.define('attribute_device', {
  idDevice: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    references: {
      model: 'device',
      key: 'idDevice'
    }
  },
  idAttribute: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'attribute',
      key: 'id'
    }
  },
  value: {
    type: DataTypes.STRING(500),
    allowNull: true
  },
  status: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
}, {
  sequelize,
  tableName: 'attribute_device',
  timestamps: false,
  indexes: [
    {
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "idDevice" },
      ]
    },
    {
      name: "AttrDevice_Attribute_fk",
      using: "BTREE",
      fields: [
        { name: "idAttribute" },
      ]
    },
  ]
});

module.exports = AttributeDevice;