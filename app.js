// Utilizar funcionalidades del Ecmascript 6
'use strict'
const cors = require('cors');
// Cargamos los módulos de express y body-parser
var express = require('express');
var bodyParser = require('body-parser');
// Llamamos a express para poder crear el servidor
var app = express();
// Importamos las rutas
var user_routes = require('./api/routes/user');
//cargar middlewares
//un metodo que se ejecuta antes que llegue a un controlador
//Configuramos bodyParser para que convierta el body de nuestras peticiones a JSON
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
// Cargamos las rutas
app.use('/', user_routes);
// exportamos este módulo para poder usar la variable app fuera de este archivo
module.exports = app;