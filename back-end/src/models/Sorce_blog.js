const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');

const ScoreBlog = sequelize.define('score_blog', {
  idBlog: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  idCustomer: {
    type: DataTypes.STRING(12),
    allowNull: false,
    references: {
      model: 'customer', // Tên bảng liên kết (nếu có)
      key: 'id',         // Tên cột trong bảng liên kết
    },
  },
  score: {
    type: DataTypes.TINYINT,
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'score_blog',
  timestamps: false, // Không có `createdAt` và `updatedAt`
  indexes: [
    {
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "idBlog" },
      ],
    },
    {
      name: "ScoreBlog_Customer_fk",
      using: "BTREE",
      fields: [
        { name: "idCustomer" },
      ],
    },
  ],
});

// Nếu bạn có liên kết với các bảng khác, khai báo như sau:
const Customer = require('./Customer'); // Import model bảng `customer`
ScoreBlog.belongsTo(Customer, { foreignKey: 'idCustomer', as: 'customer' });

module.exports = ScoreBlog;
