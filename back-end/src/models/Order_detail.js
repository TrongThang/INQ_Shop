const sequelize = require('../config/database');
const Order = require('./Order');
const Device = require('./Device');
const { DataTypes } = require('sequelize');

const OrderDetail = sequelize.define('order_detail', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    references: {
      model: 'order',
      key: 'id'
    }
  },
  idDevice: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    references: {
      model: 'device',
      key: 'idDevice'
    }
  },
  price: {
    type: DataTypes.DECIMAL(19,4),
    allowNull: true
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  amount: {
    type: DataTypes.DECIMAL(19,4),
    allowNull: true
  },
  status: {
    type: DataTypes.TINYINT,
    allowNull: true
  }
}, {
  sequelize,
  tableName: 'order_detail',
  timestamps: false,
  indexes: [
    {
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "id", name: 'idDevice' },
      ]
    },
  ]
});

Device.hasMany(OrderDetail, {foreignKey: 'idDevice', as: 'order_device'})
OrderDetail.belongsTo(Device, {foreignKey: 'idDevice', as: 'device'})
// OrderDetail.belongsTo(Order, { foreignKey: 'id', as: 'order' })

Order.hasMany(OrderDetail, { foreignKey: 'id', as: 'order_device' })
OrderDetail.belongsTo(Order, { foreignKey: 'id', as: 'order_detail' })

module.exports = OrderDetail; 
