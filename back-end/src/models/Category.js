const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');

const Category = sequelize.define('category', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    nameCategory: {
      type: DataTypes.STRING(500),
      allowNull: true,
      unique: "nameCategory"
    },
    slug: {
      type: DataTypes.STRING(500),
      allowNull: true,
      unique: "slug"
    },
    parentId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'category',
        key: 'id'
      }
    },
    image: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'category',
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
        name: "nameCategory",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "nameCategory" },
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
        name: "Category_ParentCategory_fk",
        using: "BTREE",
        fields: [
          { name: "parentId" },
        ]
      },
    ]
  });

module.exports = Category;