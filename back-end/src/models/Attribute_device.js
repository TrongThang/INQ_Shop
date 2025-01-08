const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');
const Attribute_group = require('./Attribute_group');
const Attribute = require('./Attribute');

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

AttributeDevice.belongsTo (Attribute, {foreignKey: 'idAttribute', as: 'attributes'})
Attribute.hasMany(AttributeDevice, { foreignKey: 'idAttribute', as: 'attributesForDevice' })    



module.exports = AttributeDevice;