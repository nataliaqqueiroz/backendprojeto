const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('digital_college', 'nat', 'nat123', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;