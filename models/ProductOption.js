const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const Product = require('./Product');

const ProductOption = sequelize.define('ProductOption', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Product,
        key: 'id',
        },
    onDelete: 'CASCADE', // Para deletar todas as opções associadas se o produto for deletado
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    shape: {
      type: DataTypes.ENUM('square', 'circle'),
      allowNull: true,
      defaultValue: 'square',
    },
    radius: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
    },
    type: {
        type: DataTypes.ENUM('text', 'color'),
        allowNull: true,
        defaultValue: 'text',
    },
    values: {
        type: DataTypes.STRING,
        allowNull: false
    },
    
  }, {
    tableName: 'products_option',  // Nome da tabela no banco de dados
    timestamps: true     // Cria automaticamente as colunas createdAt e updatedAt
  });
  
  module.exports = ProductOption;