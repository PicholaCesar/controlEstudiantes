const express = require('express');
const controladorusuario = require('../controllers/usuario.controller');


//middlewares

  const  md_autenticacion = require('../middlewares/autenticacion')

//rutas

const api = express.Router();

//rutas de perfil maestro
api.post('/registrarMaestro',controladorusuario.RegistrarMaestro);
api.post('/loginMaestro', controladorusuario.LoginMaestro);
api.put('/editarUsuarioMaestro/:idUsuario', md_autenticacion.Auth ,controladorusuario.editarMaestro)


// estudiante

api.post('/registrarAlumno', controladorusuario.RegistrarAlumno);
api.post('/loginalumno', controladorusuario.loginAlumno)
api.put('/editarAlumno/:idalumno', md_autenticacion.Auth ,controladorusuario.EditarAlumno)



module.exports = api;
