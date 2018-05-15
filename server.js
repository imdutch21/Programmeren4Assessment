//
const express = require('express');
const maaltijd = require('./api/maaltijd.api.js');
const studentenhuis = require('./api/studentenhuis.api.js');
const logger = require('morgan');
const bodyParser = require('body-parser');
const ApiError = require('./model/ApiError');
const authController = require('./controllers/authentication.controller');
const auth_routes = require("./api/authentication.api");
const port = process.env.PORT || 3000;

const app = express();


app.use(bodyParser.urlencoded({
    'extended': 'true'
})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json());
app.use(bodyParser.json({
    type: 'application/vnd.api+json'
})); // parse application/vnd.api+json as json

app.use(logger('dev'));

// Voeg ContentType toe aan alle responses (en ga door naar next route handler)
app.use('*', function (req, res, next) {
    res.contentType('application/json');
    console.log('URL = ' + req.originalUrl);
    next();
});


app.use('/api', auth_routes);
app.all('/api/studentenhuis*', authController.validateToken);

app.use('/api/studentenhuis', maaltijd);

app.use('/api/studentenhuis', studentenhuis);
// Endpoints pakken die niet bestaan
app.use('*', function (req, res, next) {
    const error = new ApiError("Endpoint bestaan niet", 404);
    next(error)
});


app.use(function (error, req, res, next) {
    console.error(error.toString());
    let status = 500;
    if (error instanceof ApiError && error.code !== undefined)
        status = error.code;
    res.status(status).json({
        message: error
    }).end();
});

app.listen(port, function () {
    console.log('De server luistert op port ' + port); //log the actual active port, not some static number
});

module.exports = app;

