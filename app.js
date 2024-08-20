const express = require('express')
const app = express()
app.use(express.json());
const port = 3000

app.listen(port, () => {
  console.info(`Example app listening on port ${port}`)
})

// app.js ou index.js
const sequelize = require('./database');
const User = require('./models/User');
const Category = require('./models/Category');
const Product = require('./models/Product');
const ProductImage = require('./models/ProductImage');
const ProductOption = require('./models/ProductOption');
const ProductCategory = require('./models/ProductCategory');

async function startApp() {
  try {
    await sequelize.authenticate();  // Verifica a conexão com o banco
    console.info('Conexão com o banco estabelecida com sucesso.');

    // Sincroniza todos os modelos com o banco
    await sequelize.sync();  // Cria a tabela se ela ainda não existir
    console.info('Sincronização completada com sucesso.');

    // Inicia os serviços.
  } catch (error) {
    console.error('Erro ao conectar com o banco:', error);
  }
}

app.post('/v1/user', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao criar usuário' });
  }
});

app.get('/v1/user/:id', async (req, res) => {
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

app.put('/v1/user/:id', async (req, res) => {
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

app.delete('/v1/user/:id', async (req, res) => {
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

startApp();
