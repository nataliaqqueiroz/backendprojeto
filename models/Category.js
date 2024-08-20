const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Category = sequelize.define('Category', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  slug: {
    type: DataTypes.STRING,
    allowNull: false
  },
  use_in_menu: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: 0
  },
}, {
  tableName: 'categories',  // Nome da tabela no banco de dados
  timestamps: true     // Cria automaticamente as colunas createdAt e updatedAt
  });
module.exports =Category;