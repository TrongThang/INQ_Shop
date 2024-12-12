const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');

const SlideShow = sequelize.define('slideshow', {
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
  textButton: {
    type: DataTypes.STRING(500),
    allowNull: true
  },
  link: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  image: {
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
  tableName: 'slideshow',
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
      name: "SlideShow_Employee_fk",
      using: "BTREE",
      fields: [
        { name: "idEmployee" },
      ]
    },
  ]
});

module.exports = SlideShow;