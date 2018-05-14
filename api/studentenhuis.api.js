const express = require('express');
const routes = express.Router();
const controller = require('../controllers/studentenhuis.controller');

//routes
routes.get('/:number', controller.getOneById);
routes.put('/:number', controller.update);
routes.delete('/:number', controller.delete);
routes.get('', controller.getAll);
routes.post('', controller.create);
module.exports = routes;