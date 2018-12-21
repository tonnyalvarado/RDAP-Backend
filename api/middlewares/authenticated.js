'user strict'
const atob = require('atob');
const User = require('../models/user');
const salt = require('../config/config');
const crypto = require('crypto');
exports.ensureAuth = function (req, res, next) {
  if (!req.headers.authorization) {
    return res.status(403).send({ message: 'La peticion no tiene la cabecera de autenticación' });
  } else {
    var token = req.headers.authorization.replace(/['"]+/g, '').split(' ')[1];
    const credentials = atob(token);
    const user = credentials.split(':')[0];
    var pass = credentials.split(':')[1];
    pass = crypto.pbkdf2Sync(pass, salt.salt, 1000, 64, 'sha512').toString('hex');
    User.findOne({ nick: user }, function(err, fuser) {
      if (err || !fuser) {
        res.status(404).send({
          body: null,
          status: 404,
          mensaje: "El usuario no existe"
        });
        return false;
      } else if (fuser.password != pass) {
        res.status(401).send({
          body: null,
          status: 401,
          mensaje: "Bad credentials"
        });
        return false;
      } else {
        next();
      }
    });
  }
}