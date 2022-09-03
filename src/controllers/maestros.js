'use strict'
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const Maestros = require('../models/maestros');

const lista = async (req,res) => {
    try {
        const maestros = await Maestros.find();
        res.json(maestros);
    } catch (err) { res.status(500).json(err); }
};

const nuevo = async (req,res) => {
    try {
        const { nombre, edad, genero, correo, password } = req.body;
        if (nombre, edad, genero, correo, password) {
            const maestroRepetido = await Maestros.findOne({ correo });
            if (maestroRepetido) {
                res.status(400).json({err: "El maestro ya ha sido registrado" });
            }
            const maestro = new Maestros({
                nombre,
                edad,
                genero,
                correo,
                password: bcrypt.hashSync(password, 10)
            });  
            await maestro.save();
            res.status(201).json({ msg: "El maestro fue creado con exito" });
        }
    } catch (err) { res.status(500).json(err); }
};

const inicioSesion = async (req, res) => {
    try {
        const { correo, password } = req.body;
        if (!correo && !password) {
            res.status(400).json({msg: 'Faltan datos'}); 
        }
        const maestro = await Maestros.findOne({ correo });
        const contraseñaABuscar = bcrypt.compare(req.body.password, maestro.password);
        if (!maestro && !contraseñaABuscar) {
            return res.status(401).send({ auth: false, token: null });
        }
        const token = jwt.sign({ id: maestro._id }, "secret", {
            expiresIn: 60 * 60 * 24,
        });
        res.status(200).json({ auth: true, token });
    } catch (error) { res.status(404).json(error); }  
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
        await Maestros.findByIdAndUpdate(id, updates, options);
        res.status(200).json({ msg: "El maestro fue editado con exito" });
    } catch (err) { res.status(500).json(err); }
};

const eliminacion = async (req,res) => {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({ msg: "Debes proporcionar un id" });
        }
        const maestroABuscar = await Maestros.findById(id);
        if (!maestroABuscar) {
            res.status(404).json({ msg: "El maestro no existe en nuestra base de datos" });
        } 
        await Maestros.findByIdAndDelete(id);
        res.status(200).json({msg: 'El maestro fue eliminado con exito' });
    } catch (err) { res.status(500).json(err); }
};

module.exports = {
    lista,
    nuevo,
    inicioSesion,
    edicion,
    eliminacion
}