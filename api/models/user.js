'use strict'
const mongoose = require('mongoose');
const crypto = require('crypto');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: String,
  nick: String,
  email: String,
  password: String,
});

// Exportamos el modelo para usarlo en otros ficheros
module.exports = mongoose.model('User', UserSchema);