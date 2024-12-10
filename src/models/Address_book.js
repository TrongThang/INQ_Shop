const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('address_book', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    idCustomer: {
      type: DataTypes.STRING(12),
      allowNull: true,
      references: {
        model: 'customer',
        key: 'id'
      }
    },
    district: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    city: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    ward: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    street: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    isDefault: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'address_book',
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
        name: "Customer_Address_fk",
        using: "BTREE",
        fields: [
          { name: "idCustomer" },
        ]
      },
    ]
  });
};
