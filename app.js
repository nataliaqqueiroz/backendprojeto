const express = require('express')
const app = express()
app.use(express.json());
const port = 3000

app.get('/user/:id', (req, res) => {
  console.log(req.params.id)
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
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
    console.log('Conexão com o banco estabelecida com sucesso.');

    // Sincroniza todos os modelos com o banco
    await sequelize.sync();  // Cria a tabela se ela ainda não existir
    console.log('Sincronização completada com sucesso.');

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
      await user.update(req.body);
      res.json(user);
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
