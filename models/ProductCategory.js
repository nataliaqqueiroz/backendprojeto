const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const ProductCategory = sequelize.define('ProductCategory', {
  product_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Products',
      key: 'id'
    },
    allowNull: false
  },
  category_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Categories',
      key: 'id'
    },
    allowNull: false
  }
});

module.exports = ProductCategory;