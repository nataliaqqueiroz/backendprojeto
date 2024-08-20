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

const userRoutes = require('./routes/user');
const categoryRoutes = require('./routes/category');

app.use('/v1/user', userRoutes);
app.use('/v1/category', categoryRoutes);

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

startApp();
