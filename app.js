const express = require('express');
const cors = require('cors');
const app = express();

//tiene que llevar este orden

//importacion rutas para poder utilizar

const usuarioRoutes = require('./src/Routes/usuario.routes');
const cursoRoutes = require('./src/Routes/cursos.routes');
const asignacionRoutes = require('./src/Routes/agnacion.routes');


//middlewares

app.use(express.urlencoded({ extended: false}));
app.use(express.json());


//canecera

app.use(cors());




//cargar rutas localhost:3000/api

app.use('/api',usuarioRoutes, cursoRoutes,asignacionRoutes);



module.exports = app;





