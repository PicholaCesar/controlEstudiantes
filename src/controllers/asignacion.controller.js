const asignacion = require('../model/asignacion.model');

function agregarAsignacion(req, res){

    var parametros = req.body;
    var modeloAsigacion = new asignacion();

    asignacion.find({idalumno: parametros.nombre }, (err, alumnoEncontrado)=>{
        if(alumnoEncontrado.length >2  ){
      
            return res.status(500).send({ mensaje: "este usuario ya se encuentra asignado a 3 materias"})
        }else{
              
            if(parametros.alumno && parametros.curso){

                modeloAsigacion.alumno = parametros.alumno;
                modeloAsigacion.curso = parametros.curso;

                modeloAsigacion.save((err, alumnoGuardado) =>{
                    if(err) return res.status(500).send({mensaje: "error"});
                    if(!alumnoGuardado) return res.status(500).send({ mensaje: "error"})

                    return res.status(200).send({ alumno: alumnoGuardado } )
                })
            }else{
                return res.status(500).send({mensaje: "Debe ingresar los datos obligatorios"})
            }
        }
      
    })
}

module.exports = {
    agregarAsignacion
    
}

