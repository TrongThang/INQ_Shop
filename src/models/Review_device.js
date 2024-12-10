const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('review_device', {
    idReview: {
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
    idDevice: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'device',
        key: 'idDevice'
      }
    },
    comment: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    rating: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    response: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    image: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    note: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    hide_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    status: {
      type: DataTypes.TINYINT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'review_device',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idReview" },
        ]
      },
      {
        name: "Review_CustomerHide_fk",
        using: "BTREE",
        fields: [
          { name: "idCustomer" },
        ]
      },
      {
        name: "Review_Device_fk",
        using: "BTREE",
        fields: [
          { name: "idDevice" },
        ]
      },
    ]
  });
};
