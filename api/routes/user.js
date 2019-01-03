'use strict'
// Cargamos el módulo de express para poder crear rutas
var express = require('express');
// Cargamos el controlador
var UserController = require('../controllers/user');
// Llamamos al router
var api = express.Router();
var md_auth = require('../middlewares/authenticated');
// Creamos una ruta para los métodos que tenemos en nuestros controladores
api.get('/user/all', md_auth.ensureAuth, (req, res) => {
  UserController.getAll(res);
});
api.get('/user/:id', md_auth.ensureAuth, (req, res) => {
  UserController.getUser(req, res);
});
api.post('/user', md_auth.ensureAuth, (req, res) => {
  UserController.addUser(req, res);
});
api.post('/user/whithoutAuthentication', (req, res) => {
  UserController.addUser(req, res);
});
api.put('/user/:id', md_auth.ensureAuth, (req, res) => {
  UserController.updateUser(req, res);
});
api.delete('/user/:id', md_auth.ensureAuth, (req, res) => {
  UserController.deleteUser(req, res);
});
api.post('/login', (req, res) => {
  UserController.loginUser(req, res);
});
// Exportamos la configuración
module.exports = api;