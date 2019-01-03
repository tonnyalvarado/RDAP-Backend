'use strict'
// Cargamos los modelos para usarlos posteriormente
var User = require('../models/user');
const crypto = require('crypto');
const salt = require('../config/config');

function validatePassword (user, res) {
  // decode
  const pass = crypto.pbkdf2Sync(user.password, salt.salt, 1000, 64, 'sha512').toString('hex');
  User.findOne({ nick: user.nick }, function(err, fuser) {
    if (err || fuser == null) {
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
      res.status(200).send({
        body: fuser,
        status: 200,
        mensaje: "Autenticado con exito"
      });
      return true;
    }
  });
}

module.exports = {
  // Conseguir datos de un usuario
  getUser: function (req, res) {
    var userId = req.params.id;
    User.findById(userId, (err, user) => {
      if (err) return res.status(500).send({ message: 'Error en la petición' });
      if (!user) return res.status(404).send({ message: 'EL usuario no existe' });
      return res.status(200).send(user);

    });
  },
  addUser: function (req, res) {
    var user = new User({
      name: req.body.name,
      nick: req.body.nick,
      password: crypto.pbkdf2Sync(req.body.password, salt.salt, 1000, 64, 'sha512').toString('hex'),
      email: req.body.email
    });
    user.save(function (err) {
      if (err) {
        console.log('ERROR: ' + err);
      }
    });
    res.send(user);
  },
  getAll: function (res) {
    User.find(function (err, users) {
      if (!err) {
        if (users == null) {
          users = {};
        }
        res.send(users);
      } else {
        console.log('ERROR: ' + err);
      }
    });
  },
  //PUT - Update a register already exists
  updateUser: function (req, res) {
    User.findById(req.params.id, function (err, user) {
      if (err || !user) {
        res.status(404).send({
          "status": 404,
          "message": "El usuario no existe"
        });
      } else {
        user.name = req.body.name;
        user.email = req.body.email;
        user.nick = req.body.nick;
        user.password = req.body.password;

        user.save(function (err) {
          if (err) {
            console.log('ERROR: ' + err);
          }
          res.send(user);
        });
      }
    });
  },
  //DELETE - Delete a user with specified ID
  deleteUser: function (req, res) {
    User.findById(req.params.id, function (err, user) {
      if (err || !user) {
        res.status(404).send({
          "status": 404,
          "message": "El usuario no existe"
        });
      } else {
        user.remove(function (err) {
          if (!err) {
            res.status(200).send({
              "message": "Success"
            });
          } else {
            console.log('ERROR: ' + err);
          }
        });
      }

    });
  },
  loginUser: function (req, res) {
    if (req.body.nick) {
      validatePassword(req.body, res);
    } else {
      res.status(404).send({
        body: null,
        status: 404,
        mensaje: "Body vacío"
      });
    }
  }
}
