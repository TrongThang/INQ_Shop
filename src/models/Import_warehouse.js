const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('import_warehouse', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    idEmployee: {
      type: DataTypes.STRING(12),
      allowNull: true,
      references: {
        model: 'employee',
        key: 'id'
      }
    },
    fileAuthenticate: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    totalAmount: {
      type: DataTypes.DECIMAL(19,4),
      allowNull: true
    },
    note: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    status: {
      type: DataTypes.TINYINT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'import_warehouse',
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
        name: "ImportWarehouse_Employee_fk",
        using: "BTREE",
        fields: [
          { name: "idEmployee" },
        ]
      },
    ]
  });
};
