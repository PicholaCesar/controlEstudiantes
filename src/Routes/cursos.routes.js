const express = require('express');
const controladorCurso = require('../controllers/cursos.controller');



const md_autenticacion = require('../middlewares/autenticacion');

const api = express.Router();

api.post('/agregarCurso', md_autenticacion.Auth, controladorCurso.agregarCursos);
api.get('/obtenerCursos' , md_autenticacion.Auth, controladorCurso.obteberCurso);
api.put('/editarCurso/:idcurso', md_autenticacion.Auth,controladorCurso.actualizarCurso);
api.delete('/eliminarCurso/:idcurso', md_autenticacion.Auth, controladorCurso.eliminarCurso)

module.exports = api;
