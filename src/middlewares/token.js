'use strict'
const jwt = require('jsonwebtoken');
const Alumnos = require('../models/alumnos');
const Maestros = require('../models/maestros');
const jwtSecret = require('../config');

async function Verificar(req, res, next) 
{
    //Obtener el token de los headers
    const bearerHeader = req.headers['authorization'];
    const bearer = bearerHeader.split(" ");
    const token = bearer[1];

    //Decodificar el token
    const decoded = await jwt.verify(token, jwtSecret);
    const alumno = await Alumnos.findById(decoded.id);
    const maestro = await Maestros.findById(decoded.id);

    (!alumno || !maestro) ? res.status(401).send({ auth: false, msg: "Ha olvidado el token" }) : next();
}

module.exports = Verificar;