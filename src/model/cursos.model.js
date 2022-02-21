const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cursoSchema = Schema({

    curso: String,
    Maestro: [{ 
        idMaestro:  {type: Schema.Types.ObjectId, ref: 'Usuarios'}
    }],
    idCreadorCurso: {type: Schema.Types.ObjectId, ref: 'Usuarios'}

})

module.exports = mongoose.model('Cursos', cursoSchema );