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

    if (!token) {
        return res.status(401).send({ auth: false, msg: "Ha olvidado el token" });
    }
    next();
}

module.exports = Verificar;