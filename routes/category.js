const express = require('express');
const router = express.Router();
const Category = require('../models/Category');
const authenticateToken = require('../middleware/auth');

// Requisito 01 - GET /v1/category/search
router.get('/search', authenticateToken, async (req, res) => {
    try {
        let { limit = 12, page = 1, fields, use_in_menu } = req.query;
        const where = {};

        if (use_in_menu !== undefined) {
            where.use_in_menu = use_in_menu === 'true';
        }

        if (limit === '-1') {
            limit = null;
            page = null;
        } else {
            limit = parseInt(limit, 10) || 12;
            page = parseInt(page, 10) || 1;
        }

        const options = {
            where,
            limit,
            offset: limit && page ? (page - 1) * limit : null,
        };

        if (fields) {
            options.attributes = fields.split(',');
        }

        const categories = await Category.findAll(options);
        res.status(200).json(categories);
    } catch (error) {
        res.status(400).json({ error: 'Erro ao buscar categorias' });
    }
});

// Requisito 02 - GET /v1/category/:id
router.get('/:id', authenticateToken, async (req, res) => {
    try {
        const category = await Category.findByPk(req.params.id);
        if (category) {
            res.status(200).json(category);
        } else {
            res.status(404).json({ error: 'Categoria não encontrada' });
        }
    } catch (error) {
        res.status(400).json({ error: 'Erro ao buscar categoria' });
    }
});

// Requisito 03 - POST /v1/category
router.post('/', authenticateToken, async (req, res) => {
    try {
        const { name, slug, use_in_menu } = req.body;
        const category = await Category.create({ name, slug, use_in_menu });
        res.status(201).json(category);
    } catch (error) {
        res.status(400).json({ error: 'Erro ao criar categoria' });
    }
});

// Requisito 04 - PUT /v1/category/:id
router.put('/:id', authenticateToken, async (req, res) => {
    try {
        const { name, slug, use_in_menu } = req.body;
        const category = await Category.findByPk(req.params.id);
        if (category) {
            category.name = name;
            category.slug = slug;
            category.use_in_menu = use_in_menu;
            await category.save();
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Categoria não encontrada' });
        }
    } catch (error) {
        res.status(400).json({ error: 'Erro ao atualizar categoria' });
    }
});

// Requisito 05 - DELETE /v1/category/:id
router.delete('/:id', authenticateToken, async (req, res) => {
    try {
        const category = await Category.findByPk(req.params.id);
        if (category) {
            await category.destroy();
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Categoria não encontrada' });
        }
    } catch (error) {
        res.status(400).json({ error: 'Erro ao excluir categoria' });
    }
});

module.exports = router;
