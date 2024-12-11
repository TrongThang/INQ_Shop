const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');

const Attribute_group = 
module.exports = sequelize.define('attribute_group', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  nameAttribute: {
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

module.exports = Attribute_group;