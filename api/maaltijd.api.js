const express = require('express');
const routes = express.Router();
const controller = require('../controllers/maaltijd.controller');

//routes
routes.get('/:number/maaltijd/:id', controller.getOneById);
routes.put('/:number/maaltijd/:id', controller.update);
routes.delete('/:number/maaltijd/:id', controller.delete);
routes.get('/:number/maaltijd', controller.getAll);
routes.post('/:number/maaltijd', controller.create);
module.exports = routes;