const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    'testdelivery', 'root', 'Zorigt@#1216', {
      host: 'localhost',
      port : 8080,
      dialect: 'mysql', 
      logging: false, 
    });


module.exports = sequelize;
