//ORM Object Relational Maper

  const Sequelize = require('sequelize');

  const dbConnention = new Sequelize('furniturestore', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
  });

  module.exports = dbConnention;