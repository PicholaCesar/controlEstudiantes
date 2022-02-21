const Usuario = require('../model/usuario.model')
const bcrypt = require('bcrypt-nodejs');
const jwt = require('../services/jwt')

function RegistrarMaestro(req, res){

     var parametros = req.body;
     var modelousuario = new Usuario();
  

     Usuario.find({ email : parametros.email }, (err, usuarioEncontrado) => {
        if(usuarioEncontrado.length > 0){
            return res.status(500).send({ mensaje: "este correo ya se encuentra registrado"})

        } else{

            if( parametros.nombre && parametros.apellido && parametros.email){

                modelousuario.nombre = parametros.nombre;
                modelousuario.apellido = parametros.apellido;
                modelousuario.email = parametros.email;
                modelousuario.password = '123456';
                modelousuario.rol = 'Maestro';


                bcrypt.hash(modelousuario.password, null, null, (err, passwordEncriptada) =>{
                    modelousuario.password = passwordEncriptada;

                    modelousuario.save((err, usuarioGuardado) => {
                        if(err) return res.status(500).send({ mensaje: "error en la peticion"})
                        if(!usuarioGuardado) return res.status(500).send({ mensaje: "Error al registrar usuario"});
    
                        return res.status(200).send({ usuario: usuarioGuardado})
                    });
                    

                })

              

            }else{
                return res.status(500). send({ mensaje: "debe ingresar los parametros email y password"})
            }
        }
      })
} 

function LoginMaestro(req, res){
  
    var parametros = req.body;

    Usuario.findOne( { email: parametros.email}, (err, usuarioEncontrado) =>{
        if(err) return res.status(500).send({ mensaje: "Erro en la peticion"})
        if(usuarioEncontrado){
            
            bcrypt.compare(parametros.password, usuarioEncontrado.password, (err, passwordcorrecta) =>{
                if(passwordcorrecta){
                    return res.status(200). send({ token: jwt.crearToken(usuarioEncontrado)});
                }else{
                    return res.status(500). send({ mensaje: "password no valido"});
                }
            })

        }else{
            return res.status(500). send({ mensaje: "no se encuentra"})
        }
    } )

}


function editarMaestro(req, res){
  
     var idUser = req.params.idUsuario;
     var parametros = req.body;

    delete parametros.password;
    delete parametros.rol;

    if(req.user.sub !== idUser){
        return res.status(5000).send({mensaje: "no tiene los permisos para editar el usuario"})

    }


     Usuario.findByIdAndUpdate(req.user.sub, parametros, {new: true},(err, usuarioEditado) =>{
        if(err) return res.status(500).send({ mensaje: "Erro en la peticion"});
        if(!usuarioEditado) return res.status(404).send({ mensaje: "Error al editar el Usuario"});

        return res.status(200) .send({ usuario: usuarioEditado});
     })

}


//alumno

function RegistrarAlumno (req, res){
   
     var parametros = req.body;
     var modeleusuario = new Usuario();

     Usuario.find( { email : parametros.email }, (err, usuarioEncontrado) => {
         if(usuarioEncontrado.length > 0){
             return res.status(500) . send({ mensaje: "el correo ya se ecuentra registrado"})
         }else{

            if (parametros.nombre && parametros.apellido && parametros.email) {

                modeleusuario.nombre = parametros.nombre;
                modeleusuario.apellido = parametros.apellido;
                modeleusuario.email = parametros.email;
                modeleusuario.password = 'alumno123';
                modeleusuario.rol = 'Alumno';
                

                bcrypt.hash(modeleusuario.password, null, null, (err, passwordEncriptada) =>{
                    modeleusuario.password = passwordEncriptada;

                    modeleusuario.save((err, usuarioGuardado)=>{
                        if(err) return res.status(500).send({ mensaje: "Erro en la peticion"});
                        if(!usuarioGuardado) return res.status(500).send({ mensaje: "Error al guardar el usuario"});

                        return res.status(200).send({ usuario: usuarioGuardado});
                    })

                })
                
            } else{
                return res.status(404). send({ mensaje: "Debe ingresar los datos obligatorias"});
            }
         }
     })

}

function loginAlumno(req, res){
    
    var parametros = req.body;

    Usuario.findOne({ email: parametros.email}, (err, alumnoEncontrado) =>{
        if(err) return res.status(500).send({ mensaje: "error en la ppecion"})

        if(alumnoEncontrado){

             bcrypt.compare(parametros.password, alumnoEncontrado.password, (err, verificacionpassword)=>{
                 if(verificacionpassword){

                     return res.status(200).send({ token: jwt.crearToken(alumnoEncontrado)})
                 }else{
                     return res.status(500).send({mensaje: 'la contraseña no coicide'})
                 }
             })
        }else{
            return res.status(500).send({mensaje: "el usuario no se a podido identificar"})
        }
    })
}

function EditarAlumno(req, res){

   var idAlumno = req.params.idalumno;
   var parametros = req.body;

   delete  parametros.password;
   delete parametros.rol;

    if(req.user.sub != idAlumno){
        return res.status(500).send({mensaje: "no tiene los persos para editar los usuarios"});
    }

    Usuario.findByIdAndUpdate(req.user.sub, parametros, {new: true}, (err, AlumnoEditado) =>{
  
        if(err) return res.status(500).send({ mensaje: "error en la petcion"})
        if(!AlumnoEditado) return res.status(500). send({mensaje: "erro al editar el usuario"});

        return res.status(200).send({ usuario: AlumnoEditado})
    })

}




module.exports = {
    RegistrarMaestro,
    editarMaestro,
    LoginMaestro,
    RegistrarAlumno,
    loginAlumno,
    EditarAlumno
    
}