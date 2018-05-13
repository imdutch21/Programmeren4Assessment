//
// todos.api.js
//
var express = require('express');
var routes = express.Router();

module.exports = {}

// 
// andere benadering dan je tot nu toe zag - routes zijn gescheiden van de controllers;
// de controllers verzorgen de afhandeling. 
//
routes.get('/status*', statusController.getStatus);

module.exports = routes;