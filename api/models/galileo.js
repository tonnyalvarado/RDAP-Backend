'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DatosSchema = new Schema({
  presion: Number,
  flujo: Number,
  nivel: Number,
});

const UbicacionSchema = new Schema({
  calle: String,
  numero: String,
  colonia: String,
  municipio: String,
  estado: String,
  pais: String
});

const GalileoSchema = new Schema({
  nombre: String,
  datos: [DatosSchema],
  ubicacion: [UbicacionSchema]
});

// Exportamos el modelo para usarlo en otros ficheros
module.exports = mongoose.model('Galileo', GalileoSchema);
