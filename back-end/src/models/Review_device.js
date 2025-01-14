const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');

const ReviewDevice = sequelize.define('review_device', {
  idReview: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  idCustomer: {
    type: DataTypes.STRING(12),
    allowNull: true,
    references: {
      model: 'customer',
      key: 'id'
    }
  },
  idDevice: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'device',
      key: 'idDevice'
    }
  },
  comment: {
    type: DataTypes.STRING(500),
    allowNull: true
  },
  rating: {
    type: DataTypes.SMALLINT,
    allowNull: true
  },
  response: {
    type: DataTypes.STRING(500),
    allowNull: true
  },
  note: {
    type: DataTypes.STRING(500),
    allowNull: true
  },
  status: {
    type: DataTypes.TINYINT,
    allowNull: true
  }
}, {
  sequelize,
  tableName: 'review_device',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  indexes: [
    {
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "idReview" },
      ]
    },
    {
      name: "Review_CustomerHide_fk",
      using: "BTREE",
      fields: [
        { name: "idCustomer" },
      ]
    },
    {
      name: "Review_Device_fk",
      using: "BTREE",
      fields: [
        { name: "idDevice" },
      ]
    },
  ]
});

const Device = require('../models/Device');
const Customer = require('./Customer');
// ReviewDevice.belongsTo(Device, { foreignKey: 'idDevice', as: 'device' });
ReviewDevice.belongsTo(Customer, { foreignKey: 'idCustomer', as: 'customerReview' })

Customer.hasMany(ReviewDevice, { foreignKey: 'idCustomer', as: 'customerReview' })
// ReviewDevice.belongsTo(Device, { foreignKey: 'idDevice', as: 'device' });

module.exports = ReviewDevice;