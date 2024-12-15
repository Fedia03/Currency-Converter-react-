const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('mydatabase', 'postgres', '04todote', {
    host: 'localhost',
    dialect: 'postgres',
});

module.exports = sequelize;