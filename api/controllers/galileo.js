'use strict'
// Cargamos los modelos para usarlos posteriormente
var Galileo = require('../models/galileo');

module.exports = {
  // Conseguir datos de un Galileo
  getGalileo: function (req, res) {
    var id = req.params.id;
    Galileo.findById(id, (err, galileo) => {
      if (err) return res.status(500).send({ message: 'Error en la petición' });
      if (!galileo) return res.status(404).send({ message: 'El galileo no existe' });
      return res.status(200).send(galileo);
    });
  },
  addGalileo: function (req, res) {
    var galileo = new Galileo({
      nombre: req.body.nombre,
      datos: req.body.datos,
      ubicacion: req.body.ubicacion
    });
    if (galileo.nombre) {
      galileo.save(function (err) {
        if (err) {
          console.log('ERROR: ' + err);
        }
      });
      res.send(galileo);
    } else {
      res.status(404).send({
        "status": 404,
        "message": "No se envió body"
      })
    }
  },
  getAll: function (res) {
    Galileo.find(function (err, galileos) {
      if (!err) {
        if (galileos == null) {
          galileos = {};
        }
        res.send(galileos);
      } else {
        console.log('ERROR: ' + err);
      }
    });
  },
  //PUT - Update a register already exists
  updateGalileo: function (req, res) {
    Galileo.findById(req.params.id, function (err, galileo) {
      if (err || !galileo) {
        res.status(404).send({
          "status": 404,
          "message": "El galileo no existe"
        });
      } else {
        galileo.nombre = req.body.nombre;
        galileo.ubicacion = req.body.ubicacion;

        galileo.save(function (err) {
          if (err) {
            console.log('ERROR: ' + err);
          }
          res.send(galileo);
        });
      }
    });
  },
  updateDataGalileo() {
    Galileo.findById(req.params.id, function (err, galileo) {
      if (err || !galileo) {
        res.status(404).send({
          "status": 404,
          "message": "El galileo no existe"
        });
      } else {
        galileo.datos = req.body.datos;

        galileo.save(function (err) {
          if (err) {
            console.log('ERROR: ' + err);
          }
          res.send(galileo);
        });
      }
    });
  },
  //DELETE - Delete a galileo with specified ID
  deleteGalileo: function (req, res) {
    Galileo.findById(req.params.id, function (err, galileo) {
      if (err || !galileo) {
        res.status(404).send({
          "status": 404,
          "message": "El galileo no existe"
        });
      } else {
        Galileo.remove(function (err) {
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
  }
}
