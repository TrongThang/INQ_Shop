const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('info_website', {
    KEY_NAME: {
      type: DataTypes.STRING(500),
      allowNull: false,
      primaryKey: true
    },
    VALUE: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    ID_PAGE: {
      type: DataTypes.TINYINT,
      allowNull: true,
      references: {
        model: 'page',
        key: 'id'
      }
    },
    STATUS: {
      type: DataTypes.TINYINT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'info_website',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "KEY_NAME" },
        ]
      },
      {
        name: "PAGE_id_fk",
        using: "BTREE",
        fields: [
          { name: "ID_PAGE" },
        ]
      },
    ]
  });
};
