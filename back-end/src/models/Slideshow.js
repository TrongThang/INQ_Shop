const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');

const SlideShow = sequelize.define('slideshow', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
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
    type: DataTypes.STRING(500),
    allowNull: true
  },
  image: {
    type: DataTypes.STRING(500),
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
  createdAt: 'created_at',

  updatedAt: 'updated_at',
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


const Employee = require('./Employee');
SlideShow.belongsTo(Employee, { foreignKey: 'idEmployee', as: 'employee' });


module.exports = SlideShow;