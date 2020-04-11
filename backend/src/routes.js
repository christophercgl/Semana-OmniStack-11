const express = require("express");

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

// rota de login
routes.post('/session', SessionController.create);

// listar todas as ongs do banco
routes.get('/ongs', OngController.index);

// criar uma ong
routes.post('/ongs', OngController.create);

// listar casos das ongs especificas
routes.get('/profile', ProfileController.index);

// listar todos os incidentes
routes.get('/incidents', IncidentController.index);

// criar incidentes
routes.post('/incidents', IncidentController.create);

// deletar incidentes, pegando o id passado na rota(url)
routes.delete('/incidents/:id', IncidentController.delete);

// exporta a variavel de dentro de um arquivo
module.exports = routes;