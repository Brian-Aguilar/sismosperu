const express = require("express");
const { obtener_datos_sismos, obtener_id_sismo } = require('./controllers/datosismo_controller');
// res.header("Access-Control-Allow-Origin", "*");
const routeAPI = express.Router();

routeAPI.get('/', obtener_datos_sismos)
routeAPI.get('/get/:id', obtener_id_sismo)



module.exports = routeAPI;