require('dotenv').config();
const express = require('express')
const { sequelize } = require('./models')
const app = express()
app.use(express.json());
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.info(`Example app listening on port ${port}`)
})

// app.js ou index.js
const sequelizeDb = require('./database');

const userRoutes = require('./routes/user');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');

app.use('/v1/user', userRoutes);
app.use('/v1/category', categoryRoutes);
app.use('/v1/product', productRoutes);

async function startApp() {
  try {
    await sequelizeDb.authenticate();  // Verifica a conexão com o banco
    console.info('Conexão com o banco estabelecida com sucesso.');

    // Sincroniza todos os modelos com o banco
    await sequelizeDb.sync();  // Cria a tabela se ela ainda não existir
    console.info('Sincronização completada com sucesso.');

    // Inicia os serviços.
  } catch (error) {
    console.error('Erro ao conectar com o banco:', error);
  }
}

startApp();
