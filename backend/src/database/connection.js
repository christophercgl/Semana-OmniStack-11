const knex = require('knex');
const configuration = require('../../knexfile');

const connection = knex(configuration.development);

// deixa a variavel acessivel a outros ambientes
module.exports = connection;