const sequelize = require("../config/database");
const { DataTypes } = require('sequelize');
const Device = require("./Device");

const DetailImport =  sequelize.define('detail_import', {
    idImport: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'import_warehouse',
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
    factoryPrice: {
      type: DataTypes.DECIMAL(19,4),
      allowNull: true
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    note: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    status: {
      type: DataTypes.TINYINT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'detail_import',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_import" },
          { name: "idDevice" },
        ]
      },
      {
        name: "ImportDetail_Device_fk",
        using: "BTREE",
        fields: [
          { name: "idDevice" },
        ]
      },
    ]
});
  
DetailImport.hasOne(Device, {foreignKey: 'idDevice', as: 'device'})
Device.hasMany(DetailImport, {foreignKey: 'idDevice', as: 'warehouse'})

module.exports = DetailImport;