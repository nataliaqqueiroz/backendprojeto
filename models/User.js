const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  firstname: {
    type: DataTypes.STRING,
  },
  surname: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
  }
}, {
  tableName: 'users',  // Nome da tabela no banco de dados
  timestamps: true     // Cria automaticamente as colunas createdAt e updatedAt
});

module.exports = User;