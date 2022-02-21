const express = require('express');
const controladorAsignacion = require('../controllers/asignacion.controller');

const md_autenticacion = require('../middlewares/autenticacion');

const api = express.Router();

api.post('/asignarCurso', md_autenticacion.Auth, controladorAsignacion.agregarAsignacion);


module.exports = api;
