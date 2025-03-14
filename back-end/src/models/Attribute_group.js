const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');
const Attribute = require('./Attribute');

const AttributeGroup = sequelize.define('attribute_group', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  nameAttributeGroup: {
    type: DataTypes.STRING(500),
    allowNull: true
  },
  status: {
    type: DataTypes.TINYINT,
    allowNull: true
  }
}, {
  sequelize,
  tableName: 'attribute_group',
  timestamps: false,
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

module.exports = AttributeGroup;