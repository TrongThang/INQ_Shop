const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');
const Category = require('./Category');

Blog = sequelize.define('blog', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  idCategory: {
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
 
  score: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  isHide: {
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

Blog.belongsTo(Category, { foreignKey: 'idCategory', as: 'category' });
module.exports = Blog;