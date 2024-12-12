const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('image_device', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
      
    },
    idDevice: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'device',
        key: 'idDevice'
      }
    },
    image: {
      type: DataTypes.STRING(500),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'image_device',
    timestamps: false,
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
        name: "DEVICE_IMAGES_fk",
        using: "BTREE",
        fields: [
          { name: "idDevice" },
        ]
      },
    ]
  });
};
