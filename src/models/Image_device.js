const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');

const ImageDevice = sequelize.define('image_device', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  idDevice: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'device',
      key: 'idDevice'
    }
  },
  image: {
    type: DataTypes.STRING(500),
    allowNull: true
  }
}, {
  sequelize,
  tableName: 'image_device',
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
    {
      name: "DEVICE_IMAGES_fk",
      using: "BTREE",
      fields: [
        { name: "idDevice" },
      ]
    },
  ]
});


module.exports = ImageDevice; 