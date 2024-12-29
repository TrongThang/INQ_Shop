const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');

const Device = sequelize.define('device', {
  idDevice: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING(500),
    allowNull: true,
    unique: "name"
  },
  slug: {
    type: DataTypes.STRING(500),
    allowNull: true,
    unique: "slug"
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  descriptionNormal: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  image: {
    type: DataTypes.STRING(500),
    allowNull: true
  },
  sellingPrice: {
    type: DataTypes.DECIMAL(19,4),
    allowNull: true
  },
  idCategory: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'category',
      key: 'id'
    }
  },
  status: {
    type: DataTypes.TINYINT,
    allowNull: true
  }
}, {
  sequelize,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  tableName: 'device',
  timestamps: true,
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
      name: "name",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "name" },
      ]
    },
    {
      name: "slug",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "slug" },
      ]
    },
    {
      name: "Device_Category_fk",
      using: "BTREE",
      fields: [
        { name: "idCategory" },
      ]
    },
  ]
});

const ReviewDevice = require('../models/Review_device')
Device.hasMany(ReviewDevice, { foreignKey: 'idDevice', as: 'reviews' })

module.exports = Device;