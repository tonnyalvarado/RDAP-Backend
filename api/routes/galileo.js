'use strict'
// Cargamos el módulo de express para poder crear rutas
var express = require('express');
// Cargamos el controlador
var GalileoController = require('../controllers/galileo');
// Llamamos al router
var api = express.Router();
var md_auth = require('../middlewares/authenticated');
// Creamos una ruta para los métodos que tenemos en nuestros controladores
api.get('/galileo/all', md_auth.ensureAuth, (req, res) => {
  GalileoController.getAll(res);
});
api.get('/galileo/:id', md_auth.ensureAuth, (req, res) => {
  GalileoController.getGalileo(req, res);
});
api.post('/galileo', md_auth.ensureAuth, (req, res) => {
  GalileoController.addGalileo(req, res);
});
api.put('/galileo/:id', md_auth.ensureAuth, (req, res) => {
  GalileoController.updateGalileo(req, res);
});
api.put('/galileo/data/:id', md_auth.ensureAuth, (req, res) => {
  GalileoController.updateDataGalileo(req, res);
});
api.delete('/galileo/:id', md_auth.ensureAuth, (req, res) => {
  GalileoController.deleteGalileo(req, res);
});
// Exportamos la configuración
module.exports = api;