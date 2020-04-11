const express = require('express');

const cors = require('cors');

// ./ referencia que o arquivo está na mesma pasta
const routes = require('./routes');

const app = express();

app.use(cors()); // como tá no ambiente de dev deixa assim
// em prod usa assim
/*
app.use(cors({
  origin: 'http://meuapp.com' // coloca endereço do front q vai acessar
}));
*/


app.use(express.json()); // diz que as requisição do body serão no formato json
app.use(routes);

/**
 *  Rota -> caminho completo
 *  Recurso -> lugar especifico. Ex /users 
 */

/** 
 * Métodos HTTP:
 * 
 * GET: Buscar/listar uma informação do back-end
 * POST: Criar uma informação no back-end
 * PUT: Alterar um informação no back-end
 * DELETE: Deletar uma informação no back-end
 */

 /**
  * Tipos de parâmetors:
  * 
  * Query Params: Parâmetros nomeados enviados na rota após "?" (Filtros, paginação) | request.query
  * Route Params: Parâmetros utilizados p/ identificar recursos rota tem /:id | /users/:id | request.params pega o id;
  * Request Body: Corpo da requisição, utilizado para criar ou alterar recursos | request.body
  * 
  */

/**
  * SQL: MySQL, SQLite, PostgreSQL, Oracle, Microsoft SQL Server
  *  NoSQL: MongoDB, CouchDB, etc
  */

/**
 * Driver: SELECT * FROM users
 * Query Builder: table('users').select('*').where()
 */

app.listen(3333); // setar porta