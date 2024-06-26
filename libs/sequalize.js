const { Sequelize } = require('sequelize');

const { config } = require('./../config/config');
const setupModels = require('./../db/models/index');


const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `mysql://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;


const sequalize = new Sequelize(URI, {
  dialect: 'mysql',
  logging: true,

});

setupModels(sequalize);
// sequalize.sync();


module.exports = sequalize;
