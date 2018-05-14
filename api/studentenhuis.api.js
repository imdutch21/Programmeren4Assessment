const express = require('express');
const routes = express.Router();
const controller = require('../controllers/studentenhuis.controller');

//routes
routes.get('/:id', controller.getOneById);
routes.put('/:id', controller.update);
routes.delete('/:id', controller.delete);
routes.get('', controller.getAll);
routes.post('', controller.create);
module.exports = routes;