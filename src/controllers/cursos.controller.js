const curso = require('../model/cursos.model');
const pdfkit = require('pdfkit');
const fs = require('fs');

const pdfDocument = new pdfkit

pdfDocument.pipe(fs.createWriteStream("output.pdf"))

pdfDocument.text(curso.find({}),{
      fit: [250,300],
      align: 'center',
      valign: 'center',
  

      
})

pdfDocument.end()



function agregarCursos(req, res){

    var parametros = req.body;
    var modeloCurso = new curso();

    

    if(parametros.curso){
 
        modeloCurso.curso = parametros.curso;

        modeloCurso.idCreadorCurso = req.user.sub;

        modeloCurso.save((err, cursoGuardado) =>{
            if(err) return res.status(500).send({ mensaje: "erro en la petcion"});
            if(!cursoGuardado) return res.status(500).send({mensaje: "erro al agragar el curso"})

            return res.status(200).send({ curso: cursoGuardado})
        })

    }else{
        return res.status(500).send({mensaje: "debe ingresar el curso "})
    }
}

function actualizarCurso(req, res){
    var idcurso = req.params.idcurso;
    var parametros = req.body;

    if(req.user.sub !== idcurso){
        return res.status(500).send({mensaje: "no tines permiso para editar el curso"})
    }

    curso.findByIdAndUpdate(req.user.sub, parametros,{new: true}, (err, cursoEditado)=>{

        if(err) return res.status(500).send({ mensaje: 'Error en  la peticion'});
        if(!usuarioEditado) return res.status(500).send({mensaje: 'Error al editar el curso'});

        return res.status(200).send({ usuario: cursoEditado });

    })
   
}

function eliminarCurso(req, res){
    var idCurso = req.params.idcurso;

    curso.findByIdAndDelete(idCurso,(err, cursoEliminado) =>{

        if(err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if(!cursoEliminado) return res.status(500)
            .send({ mensaje: 'Error al eliminar el producto' })

        return res.status(200).send({ curso: cursoEliminado });
    })
}


function obteberCurso(req, res){

    curso.find({},(err, cursoEncontrado) =>{

        if(err) return res.status(500).send({ mensaje: "error al obtener"});
        if(!cursoEncontrado) return res.status(500).send({mensaje : "erro al obtener curso"});

        return res.status(200).send({ curso: cursoEncontrado})
    }).populate('idCreadorCurso', 'nombre rol')
}




module.exports ={
    agregarCursos,
    obteberCurso,
    actualizarCurso,
    eliminarCurso
}