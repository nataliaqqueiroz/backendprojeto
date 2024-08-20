const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const Product = require('./Product');
const Category = require('./Category');

const ProductCategory = sequelize.define('ProductCategory', {
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Product,
      key: 'id',
    },
    onDelete: 'CASCADE', // Opcional, define o comportamento em caso de deleção de produto
  },
  category_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Category,
      key: 'id',
    },
    onDelete: 'CASCADE', // Opcional, define o comportamento em caso de deleção de categoria
  },
}, {
  tableName: 'product_categories',
  timestamps: false, // Se não for necessário registrar o createdAt e updatedAt
});

module.exports = ProductCategory;
