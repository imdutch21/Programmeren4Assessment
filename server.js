//
const http = require('http');
const express = require('express');
const maaltijd = require('./api/maaltijd.api.js');


const bodyParser = require('body-parser');
const ApiError = require('./model/ApiError');
const authController = require('./controllers/authentication.controller');
const auth_routes = require("./api/authentication.api");
const port = process.env.PORT || 3000;

const app = express();


//Check van de Api key

app.use(bodyParser.urlencoded({
    'extended': 'true'
})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json());
app.use(bodyParser.json({
    type: 'application/vnd.api+json'
})); // parse application/vnd.api+json as json


app.use('/api', auth_routes);
app.all('*', authController.validateToken);

app.use('/api/studentenhuis', maaltijd);

// Endpoints pakken die niet bestaan
app.use('*', function (req, res, next) {
    const error = new ApiError("Endpoint bestaan niet", 404);
    next(error)
});
// Instantierr de api endpoint routes die we willen aanbieden
// app.use('/api', routes_v1);
app.use('/api/studentenhuis', maaltijd);
app.use('/api/studentenhuis', studentenhuis);

// Logregel, wordt getoond wanneer geen andere routes matchten
// EN er geen foutsituatie is - anders wordt de error handler aangeroepen  
app.use('*', function (req, res, next) {
    res.status(404) //return 404 for a 404 route, not 200!
        .json({
            message: 'Geen enkele endpoint matcht!'
        })
        .end();
});


app.use(function (error, req, res, next) {
    console.error(error.toString());
    let status = 500;
    if (error instanceof ApiError && error.status !== undefined)
        status = error.status;

    res.status(status).json({
        message: error
    }).end();
});

app.listen(port, function () {
    console.log('De server luistert op port ' + port); //log the actual active port, not some static number
});

module.exports = app;

