//
// Auth-routes
//

let authcontroller = require('../controllers/authentication.controller');
let express = require('express');
let routes = express.Router();

// endpoints Router

routes.post('/login', authcontroller.login);
routes.post('/register', authcontroller.register);
module.exports = routes;