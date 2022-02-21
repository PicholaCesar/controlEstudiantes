const jwt_simple = require('jwt-simple');
const moment = require('moment');
const claveSecreta = "clave_secreta_control";

exports.Auth = function(req, res, next){
    if(!req.headers.authorization){
        return res.status(500).send({ mensaje: "la peticion no tiene la cabezera authorization"});
    }

    var token = req.headers.authorization.replace(/['"]+/g, '');

    try {
        var payload = jwt_simple.decode(token, claveSecreta);
        if(payload.exp <= moment().unix()){
            res.status(500).send({ mensaje: "El token ha expirado"});
        }
    } catch (error) {
        return res.status(500).send({ mensaje: "El token no es valido"})
    }

    req.user = payload;

    next();
}