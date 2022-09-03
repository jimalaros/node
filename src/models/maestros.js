'use stric'
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var MaestrosSchema = Schema({
    nombre: { type: String, require: true},
    edad: { type: Number, require: true},
    genero: { type: String, require: true},
    correo: { type: String, require: true, unique: true},
    password: { type: String, require: true}
});

module.exports = mongoose.model('Maestros', MaestrosSchema);