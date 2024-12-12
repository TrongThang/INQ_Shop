

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('detail_import', {
    id_import: {
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
};
