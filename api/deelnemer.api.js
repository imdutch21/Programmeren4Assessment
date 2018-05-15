const express = require('express');
const routes = express.Router();
const controller = require('../controllers/deelnemer.controller');

routes.get('/:studentenhuisID/maaltijd/:maaltijdID/deelnemers', controller.getAll);
routes.post('/:studentenhuisID/maaltijd/:maaltijdID/deelnemers', controller.create);
routes.delete('/:studentenhuisID/maaltijd/:maaltijdID/deelnemers', controller.delete);
module.exports = routes;