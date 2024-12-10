const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('attribute', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nameAttribute: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    datatype: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    required: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    idGroupAttribute: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'attribute_group',
        key: 'id'
      }
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
    tableName: 'attribute',
    timestamps: true,
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
        name: "Attribute_Category_fk",
        using: "BTREE",
        fields: [
          { name: "idCategory" },
        ]
      },
      {
        name: "Attribute_GroupCategory_fk",
        using: "BTREE",
        fields: [
          { name: "idGroupAttribute" },
        ]
      },
    ]
  });
};
