const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');

Blog = sequelize.define('blog', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  category_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'category',
      key: 'id'
    }
  },
  title: {
    type: DataTypes.STRING(500),
    allowNull: true
  },
  author: {
    type: DataTypes.STRING(12),
    allowNull: true,
    references: {
      model: 'employee',
      key: 'id'
    }
  },
  content: {
    type: DataTypes.STRING(500),
    allowNull: true
  },
  contentNormal: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  image: {
    type: DataTypes.STRING(500),
    allowNull: true
  },
  view_point: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  score: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  hide_at: {
    type: DataTypes.DATE,
    allowNull: true
  },
  status: {
    type: DataTypes.TINYINT,
    allowNull: true
  }
}, {
  sequelize,
  tableName: 'blog',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
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
      name: "Blog_Category_fk",
      using: "BTREE",
      fields: [
        { name: "category_id" },
      ]
    },
    {
      name: "Blog_Employee_fk",
      using: "BTREE",
      fields: [
        { name: "author" },
      ]
    },
  ]
});

module.exports = Blog;