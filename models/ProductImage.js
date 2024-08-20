const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const Product = require('./Product');

const ProductImage = sequelize.define('ProductImage', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    product_id: {
        type: DataTypes.INTEGER, //falta
        allowNull: false,
        references: {
            model: Product,
            key: 'id',
    },
    onDelete: 'CASCADE', // Para deletar todas as imagens associadas se o produto for deletado
    },
    enabled: {
        type: DataTypes.BOOLEAN, //falta
        allowNull: true,
        defaultValue: false,
    },
    path: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
        tableName: 'product_images',  // Nome da tabela no banco de dados
        timestamps: true     // Cria automaticamente as colunas createdAt e updatedAt
});

module.exports = ProductImage;