const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('payment_info', {
    accountNumber: {
      type: DataTypes.STRING(500),
      allowNull: false,
      primaryKey: true
    },
    bank: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    nameAccount: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    idCustomer: {
      type: DataTypes.STRING(12),
      allowNull: true,
      references: {
        model: 'customer',
        key: 'id'
      }
    },
    is_default: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    status: {
      type: DataTypes.TINYINT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'payment_info',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "accountNumber" },
        ]
      },
      {
        name: "Customer_PaymentInfo_fk",
        using: "BTREE",
        fields: [
          { name: "idCustomer" },
        ]
      },
    ]
  });
};
