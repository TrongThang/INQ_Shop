const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');

const Contact = sequelize.define('contact', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  fullname: {
    type: DataTypes.STRING(500),
    allowNull: true
  },
  title: {
    type: DataTypes.STRING(500),
    allowNull: true
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  email: {
    type: DataTypes.STRING(500),
    allowNull: true
  },
  status: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
}, {
  sequelize,
  tableName: 'contact',
  timestamps: true,
<<<<<<< HEAD
  createdAt: 'created_at',
  updatedAt: 'updated_at',
=======
>>>>>>> 1b4ef6aa5496c70885c043fad13159bfbce5cb86
  indexes: [
    {
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "id" },
      ]
    },
  ]
});

module.exports = Contact;