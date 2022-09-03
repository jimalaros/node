'use strict'
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const Alumnos = require('../models/alumnos');

const lista = async (req,res) => {
    try {
        const alumnos = await Alumnos.find();
        res.json(alumnos);
    } catch (err) { res.status(500).json(err); }
};

const nuevo = async (req,res) => {
    try {
        const { n_cuenta, nombre, edad, genero, correo, password } = req.body;
        if (n_cuenta, nombre, edad, genero, correo, password) {
            const alumnoRepetido = await Alumnos.findOne({ correo });
            if (alumnoRepetido) {
                res.status(400).json({err: "El alumno ya ha sido registrado" });
            }
            const alumno = new Alumnos({
                n_cuenta,
                nombre,
                edad,
                genero,
                correo,
                password: bcrypt.hashSync(password, 10)
            });  
            await alumno.save();
            res.status(201).json({ msg: "El alumno fue creado con exito" });
        }
    } catch (err) { res.status(500).json(err); }
};

const inicioSesion = async (req, res) => {
    try {
        const { correo, password } = req.body;
        if (!correo && !password) {
            res.status(400).json({msg: 'Faltan datos'}); 
        }
        const alumno = await Alumnos.findOne({ correo });
        const contraseñaABuscar = bcrypt.compare(req.body.password, alumno.password);
        if (!alumno && !contraseñaABuscar) {
            return res.status(401).send({ auth: false, token: null });
        }
        const token = jwt.sign({ id: alumno._id }, "secret", {
            expiresIn: 60 * 60 * 24,
        });
        res.status(200).json({ auth: true, token });
    } catch (error) { 
        console.log(error)
    }  
};

const edicion = async (req,res) => {
    try {
        const { id } = req.params;
        const datos = req.body;
        if (!datos) {
            res.status(400).json({ err: "Debes proporcionar un id" });
        }
        const updates = { ...req.body };
        const options = { new: true };
        await Alumnos.findByIdAndUpdate(id, updates, options);
        res.status(200).json({ msg: "El alumno fue editado con exito" });
    } catch (err) { res.status(500).json(err); }
};

const eliminacion = async (req,res) => {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({ msg: "Debes proporcionar un id" });
        }
        const alumnoABuscar = await Alumnos.findById(id);
        if (!alumnoABuscar) {
            res.status(404).json({ msg: "El alumno no existe en nuestra base de datos" });
        } 
        await Alumnos.findByIdAndDelete(id);
        res.status(200).json({msg: 'El alumno fue eliminado con exito' });
    } catch (err) { res.status(500).json(err); }
};

module.exports = {
    lista,
    nuevo,
    inicioSesion,
    edicion,
    eliminacion
}