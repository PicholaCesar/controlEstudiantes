const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const asignacionSchema = Schema({

     alumno: String,
     curso: String,

})

module.exports = mongoose.model('asignacion', asignacionSchema);