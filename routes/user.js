const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { secret, expiresIn } = require('../config/jwt');
const authenticateToken = require('../middleware/auth');

router.post('/token', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ where: { email: email } });

    if (!user) {
        return res.status(400).json({ error: 'Invalid username or password' });
    }

    if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn });

    res.status(200).json({ token });
});

router.post('/', authenticateToken, async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: 'Erro ao criar usuário' });
    }
});

router.get('/:id', authenticateToken, async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ error: 'Usuário não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar usuário' });
    }
})

router.put('/:id', authenticateToken, async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (user) {
            let data = {};

            if (req.body.firstname) {
                data.firstname = req.body.firstname;
            }

            if (req.body.surname) {
                data.surname = req.body.surname;
            }

            if (req.body.email) {
                data.email = req.body.email;
            }

            if (typeof data.firstname != 'string' || typeof data.surname != 'string' || typeof data.email != 'string') {
                res.status(400).json({ error: 'Dados incorretos' });
            }

            await user.update(data);
            res.status(204).json(user);
        } else {
            res.status(404).json({ error: 'Usuário não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar usuário' });
    }
});

router.delete('/:id', authenticateToken, async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (user) {
            await user.destroy();
            res.json({ message: 'Usuário excluído com sucesso' });
        } else {
            res.status(404).json({ error: 'Usuário não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erro ao excluir usuário' });
    }
});

module.exports = router;