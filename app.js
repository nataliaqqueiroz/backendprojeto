const express = require('express')
const app = express()
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
const User = require('./models/User');  // Importe o modelo User ou outros modelos
const Category = require('./models/Category');
const Product = require('./models/Product');
const ProductImage = require('./models/ProductImage');
const ProductOption = require('./models/ProductOption');
const ProductCategory = require('./models/ProductCategory');

async function startApp() {
  try {
    await sequelize.authenticate();  // Verifica a conexão com o banco de dados
    console.log('Conexão com o banco de dados estabelecida com sucesso.');

    // Sincroniza todos os modelos com o banco de dados
    await sequelize.sync();  // Cria a tabela se ela ainda não existir
    console.log('Sincronização completa, tabelas criadas.');

    // Aqui você pode começar a iniciar seu servidor ou outros serviços.
  } catch (error) {
    console.error('Erro ao conectar com o banco de dados:', error);
  }
}

startApp();
