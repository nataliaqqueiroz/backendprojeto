// routes/product.js
const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Category = require('../models/Category');
const authenticateToken = require('../middleware/auth');

const { Op } = require('sequelize');

// Requisito 01 - GET /v1/product/search
router.get('/search', authenticateToken, async (req, res) => {
    try {
        // Recebendo parâmetros da query string
        const { limit = 12, page = 1, fields = 'name,price,description', match = '', category_ids = '', price_range = '' } = req.query;

        // Preparando filtros
        const categoryIds = category_ids.split(',').map(id => parseInt(id, 10)).filter(id => !isNaN(id));
        const [priceMin, priceMax] = price_range.split('-').map(val => parseFloat(val)).filter(val => !isNaN(val));

        console.log(categoryIds)

        // Construindo o objeto de filtros
        const whereConditions = {
            enabled: true, // Considerando apenas produtos habilitados
            [Op.and]: [
                {
                    [Op.or]: [
                        {
                            name: {
                                [Op.like]: `%${match}%`
                            }
                        },
                        {
                            description: {
                                [Op.like]: `%${match}%`
                            }
                        }
                    ]
                },
                {
                    price: {
                        [Op.between]: [isNaN(priceMin) ? 0 : priceMin, isNaN(priceMax) ? Number.MAX_VALUE : priceMax]
                    }
                }
            ]
        };

        // Adicionando filtro de categorias se fornecido
        const includeCategories = categoryIds.length > 0 ? [{
            model: Category,
            as: 'Categories',
            attributes: [],
            where: {
                id: {
                    [Op.in]: categoryIds
                }
            }
        }] : [];

        // Consultando produtos
        const products = await Product.findAll({
            attributes: fields.split(','),
            where: whereConditions,
            include: includeCategories,
            limit: parseInt(limit, 10),
            offset: (parseInt(page, 10) - 1) * parseInt(limit, 10)
        });

        // Retornando resposta
        res.status(200).json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(400).json({ error: 'Invalid request parameters' });
    }
});

// Requisito 02 - GET /v1/product/:id
router.get('/:id', authenticateToken, async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (product) {
            res.status(200).json(product);
        } else {
            res.status(404).json({ error: 'Produto não encontrado' });
        }
    } catch (error) {
        res.status(400).json({ error: 'Erro ao buscar produto' });
    }
});

// Requisito 03 - POST /v1/product
router.post('/', authenticateToken, async (req, res) => {
    try {
        const { enabled, name, slug, stock, description, price, price_with_discount, category_ids, images, options } = req.body;
        const product = await Product.create({ enabled, name, slug, stock, description, price, price_with_discount, category_ids, images, options });
        res.status(201).json(product);
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: 'Erro ao criar produto' });
    }
});

// Requisito 04 - PUT /v1/product/:id
router.put('/:id', authenticateToken, async (req, res) => {
    try {
        const { enabled, name, slug, stock, description, price, price_with_discount, category_ids, images, options } = req.body;
        const product = await Product.findByPk(req.params.id);
        if (product) {
            product.enabled = enabled;
            product.name = name;
            product.slug = slug;
            product.stock = stock;
            product.description = description;
            product.price = price;
            product.price_with_discount = price_with_discount;
            product.category_ids = category_ids;
            product.images = images;
            product.options = options;
            await product.save();
            res.status(204).send(); // No Content
        } else {
            res.status(404).json({ error: 'Produto não encontrado' });
        }
    } catch (error) {
        res.status(400).json({ error: 'Erro ao atualizar produto' });
    }
});

// Requisito 05 - DELETE /v1/product/:id
router.delete('/:id', authenticateToken, async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (product) {
            await product.destroy();
            res.status(204).send(); // No Content
        } else {
            res.status(404).json({ error: 'Produto não encontrado' });
        }
    } catch (error) {
        res.status(400).json({ error: 'Erro ao excluir produto' });
    }
});

module.exports = router;
