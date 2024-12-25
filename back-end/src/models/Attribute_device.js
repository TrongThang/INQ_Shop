const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('attribute_device', {
    idDevice: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'device',
        key: 'idDevice'
      }
    },
    idAttribute: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'attribute',
        key: 'id'
      }
    },
    value: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'attribute_device',
    timestamps: false,
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
        name: "AttrDevice_Attribute_fk",
        using: "BTREE",
        fields: [
          { name: "idAttribute" },
        ]
      },
    ]
  });
};
